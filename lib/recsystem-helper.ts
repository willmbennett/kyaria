import { JobClass } from "../models/Job";

const stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]

// Function to convert job into string

function extractStringValues(obj: any): string {
    const excludedKeys = ["_id", "createdAt", "updatedAt", 'company', 'location', 'employmentType', 'salaryRange', 'remote'];

    if (obj === null || typeof obj === 'undefined') {
        return '';
    }
    if (typeof obj === 'string') {
        const cleanString = obj.replace(/[^a-zA-Z\s]/g, '').toLowerCase();
        return cleanString;
    }
    if (Array.isArray(obj)) {
        return obj.map(value => extractStringValues(value)).join(' ');
    }
    if (typeof obj === 'object') {
        return Object.entries(obj)
            .filter(([key]) => !excludedKeys.includes(key))
            .map(([, value]) => extractStringValues(value))
            .join(' ');
    }
    return ''; // for other data types like numbers, booleans, etc.
}

export function createTF(obj: any) {
    const singleWords = extractStringValues(obj)
        .split(' ')
        .filter(s => s !== '')
        .filter(s => !stopwords.includes(s.toLowerCase()));

    const wordCounts = singleWords.reduce((acc: Record<string, number>, word: string) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {});

    const sortedWordEntries = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])  // Sort by frequency, in descending order
        .map(([term, tf]) => ({ term, tf }));  // Map to desired format

    return sortedWordEntries;
}


type TermFrequency = {
    term: string;
    tf: number;
}

type jobsTF = {
    jobId: string;
    tf: TermFrequency[];
}

function calculateIDF(jobs: jobsTF[]) {
    const termDocumentCounts: Record<string, number> = {};

    jobs.forEach(job => {
        job.tf.forEach(({ term }) => {
            if (!termDocumentCounts[term]) {
                termDocumentCounts[term] = 0;
            }
            termDocumentCounts[term]++;
        });
    });

    const totalDocuments = jobs.length;
    const termIDFs: Record<string, number> = {};

    for (let term in termDocumentCounts) {
        const documentCountForTerm = termDocumentCounts[term];
        termIDFs[term] = Math.log(totalDocuments / (1 + documentCountForTerm)); // Added 1 to avoid division by zero
    }

    return termIDFs;
}

function calculateTFIDF(jobsTF: jobsTF[], termIDFs: Record<string, number>): jobsTF[] {
    return jobsTF.map(job => {
        const tfIdf = job.tf.map(tf => {
            return {
                term: tf.term,
                tf: tf.tf * (termIDFs[tf.term] || 0)
            };
        })
            .sort((a, b) => b.tf - a.tf)  // Sort by frequency, in descending order;;
        return {
            jobId: job.jobId,
            tf: tfIdf
        };
    })
}


function dotProduct(A: TermFrequency[], B: TermFrequency[]): number {
    let sum = 0;

    A.forEach(a => {
        const b = B.find(b => b.term === a.term);
        if (b) {
            sum += a.tf * b.tf;
        }
    });

    return sum;
}

function magnitude(vector: TermFrequency[]): number {
    return Math.sqrt(vector.reduce((sum, v) => sum + v.tf * v.tf, 0));
}

function cosineSimilarity(A: TermFrequency[], B: TermFrequency[]): number {
    return dotProduct(A, B) / (magnitude(A) * magnitude(B));
}

export type JobSimilarity = {
    jobId1: string;
    jobId2: string;
    similarity: number;
};

export function calculateSimilarities(jobsTFIDF: jobsTF[]): JobSimilarity[] {
    const similarities: JobSimilarity[] = [];

    for (let i = 0; i < jobsTFIDF.length; i++) {
        for (let j = i + 1; j < jobsTFIDF.length; j++) {
            const similarity = cosineSimilarity(jobsTFIDF[i].tf, jobsTFIDF[j].tf);
            similarities.push({
                jobId1: jobsTFIDF[i].jobId,
                jobId2: jobsTFIDF[j].jobId,
                similarity: similarity
            });
        }
    }

    return similarities;
}

export function createJobKeywords(jobs: JobClass[]) {
    const jobsTermFrequencies = jobs.map(job => ({ jobId: job._id.toString(), tf: createTF(job) }));
    const termIDFs = calculateIDF(jobsTermFrequencies);
    const jobsTFIDF = calculateTFIDF(jobsTermFrequencies, termIDFs);
    const jobsSimilarity = calculateSimilarities(jobsTFIDF)
    return jobsSimilarity;
}

export function getTopSimilarJobs(jobIds: string[], jobs: JobClass[]): string[] {
    // Calculate all the job similarities
    const allSimilarities = createJobKeywords(jobs);

    // Filter the similarities for only those that are related to the given jobIds
    const relatedSimilarities = allSimilarities.filter(similarity =>
        jobIds.includes(similarity.jobId1) || jobIds.includes(similarity.jobId2)
    );

    // Maps to store the sum of cosine similarities and the count for each jobId
    const sumSimilarities: { [key: string]: number } = {};
    const countOccurrences: { [key: string]: number } = {};

    for (const similarity of relatedSimilarities) {
        sumSimilarities[similarity.jobId1] = (sumSimilarities[similarity.jobId1] || 0) + similarity.similarity;
        countOccurrences[similarity.jobId1] = (countOccurrences[similarity.jobId1] || 0) + 1;

        sumSimilarities[similarity.jobId2] = (sumSimilarities[similarity.jobId2] || 0) + similarity.similarity;
        countOccurrences[similarity.jobId2] = (countOccurrences[similarity.jobId2] || 0) + 1;
    }

    // Calculate average cosine similarity for each jobId
    const avgSimilarities: { [key: string]: number } = {};
    for (const job of jobs) {
        avgSimilarities[job._id.toString()] = sumSimilarities[job._id.toString()] / (countOccurrences[job._id.toString()] || 1);
    }

    // Sort jobs based on their average cosine similarity in descending order
    const sortedJobs = jobs.sort((a, b) => (avgSimilarities[b._id.toString()] || 0) - (avgSimilarities[a._id.toString()] || 0));

    // Filter out any jobs from the input list and then take the top 50
    const filteredJobs = sortedJobs.filter(job => !jobIds.includes(job._id.toString()));

    return filteredJobs.slice(0, 50).map(job => job._id.toString());  // Return top 50 jobIds
}






