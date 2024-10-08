import { JobClass } from "../models/Job";
import { ProfileClass } from "../models/Profile";

const stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]

const profileKeys = ["title",
    "summary",
    "areas_of_expertise",
    "skills",
    "education",
    "professional_experience",
    'details',
    'responsibilities',
    'content',
    'start_date',
    'end_date',
    'degree',
    'company',
    'institution'
];

const jobKeys = ["jobTitle",
    "aboutCompany",
    "jobDescription",
    'qualifications',
    'responsibilities',
    'skills'];

// Function to convert job into string

function extractStringValues(obj: any, keys: string[]): string {

    if (obj === null || typeof obj === 'undefined') {
        return '';
    }
    if (typeof obj === 'string') {
        const cleanString = obj.replace(/[^a-zA-Z\s]/g, '').toLowerCase();
        return cleanString;
    }
    if (Array.isArray(obj)) {
        return obj.map(value => extractStringValues(value, keys)).join(' ');
    }
    if (typeof obj === 'object') {
        return Object.entries(obj)
            .filter(([key]) => keys.includes(key))
            .map(([, value]) => extractStringValues(value, keys))
            .join(' ');
    }
    return ''; // for other data types like numbers, booleans, etc.
}

export function createTF(obj: any, keys: string[]) {
    const singleWords = extractStringValues(obj, keys)
        .split(' ')
        .filter(s => s !== '')
        .filter(s => !stopwords.includes(s.toLowerCase()));

    const wordCounts = singleWords.reduce((acc: Record<string, number>, word: string) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {});

    const sortedWordEntries = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])  // Sort by frequency, in descending order
        .map(([term, value]) => ({ term, value }));  // Map to desired format

    return sortedWordEntries;
}


type TermFrequency = {
    term: string;
    value: number;  // This was previously tf
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
                value: tf.value * (termIDFs[tf.term] || 0)  // Changed tf.tf to tf.value
            };
        })
            .sort((a, b) => b.value - a.value);  // Sort by tf-idf value, in descending order;;
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
            sum += a.value * b.value;
        }
    });

    return sum;
}

function magnitude(vector: TermFrequency[]): number {
    return Math.sqrt(vector.reduce((sum, v) => sum + v.value * v.value, 0));
}

function cosineSimilarity(A: TermFrequency[], B: TermFrequency[]): number {
    return dotProduct(A, B) / (magnitude(A) * magnitude(B));
}

export type JobSimilarity = {
    jobId: string;
    similarity: number;
};

export function calculateSimilarities(jobsTFIDF: jobsTF[]): Record<string, JobSimilarity[]> {
    const MAX_SIMILAR_JOBS = 10;
    const MIN_SIMILARITY = 0.1;
    const jobToSimilaritiesMap: Record<string, JobSimilarity[]> = {};

    for (let i = 0; i < jobsTFIDF.length; i++) {
        const jobId1 = jobsTFIDF[i].jobId;
        const currentSimilarities: JobSimilarity[] = [];

        for (let j = 0; j < jobsTFIDF.length; j++) {
            if (i !== j) {
                const jobId2 = jobsTFIDF[j].jobId;
                const similarity = cosineSimilarity(jobsTFIDF[i].tf, jobsTFIDF[j].tf);
                //console.log(similarity)

                // Check if similarity is greater than MIN_SIMILARITY before pushing
                if (similarity > MIN_SIMILARITY) {
                    currentSimilarities.push({
                        jobId: jobId2,
                        similarity: similarity
                    });
                }
            }
        }

        // Sort by similarity in descending order
        currentSimilarities.sort((a, b) => b.similarity - a.similarity);

        // Store only the top MAX_SIMILAR_JOBS
        jobToSimilaritiesMap[jobId1] = currentSimilarities.slice(0, MAX_SIMILAR_JOBS);
    }

    return jobToSimilaritiesMap;
}




export function createRecommendations(jobs: JobClass[]) {
    const jobsTermFrequencies = jobs.map(job => ({ jobId: job._id.toString(), tf: createTF(job, jobKeys) }));
    const termIDFs = calculateIDF(jobsTermFrequencies);
    const jobsTFIDF = calculateTFIDF(jobsTermFrequencies, termIDFs);
    const jobsSimilarity = calculateSimilarities(jobsTFIDF);

    const result = jobs.map(job => {
        return {
            jobId: job._id.toString(),
            jobsSimilarity: jobsSimilarity[job._id.toString()],
            jobTFIDF: jobsTFIDF.find(tfidf => tfidf.jobId === job._id.toString())?.tf
        };
    });

    return result;
}

export function profileTFIDF(profile: ProfileClass, termIDFs: Record<string, number>): TermFrequency[] {
    const profileTF = createTF(profile, profileKeys);
    return profileTF.map(tf => {
        return {
            term: tf.term,
            value: tf.value * (termIDFs[tf.term] || 0)
        };
    })
        .sort((a, b) => b.value - a.value);  // Sort by tf-idf value, in descending order
}

function rankJobsByProfile(profile: ProfileClass, jobs: JobClass[]): string[] {
    const MINIMUM_QUALITY_SCORE = 0.2;
    const profileTF = createTF(profile, profileKeys);
    const jobScores: Record<string, number> = {};

    jobs.forEach(job => {
        const jobTF = createTF(job, jobKeys);
        const similarity = cosineSimilarity(profileTF, jobTF);
        if (similarity >= MINIMUM_QUALITY_SCORE) {
            jobScores[job._id.toString()] = similarity;
        }
    });

    const finalJobList = Object.entries(jobScores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([jobId]) => jobId);

    //console.log(finalJobList.length)

    // Sort jobs by their similarity to the profile, filter out those below the threshold, and return the sorted jobIds
    return finalJobList
}



export function getTopSimilarJobs(userJobs: string[], jobsWithSimilarities: JobClass[], profile: ProfileClass): string[] {
    const SIMILAR_JOB_WEIGHT = 0.6;
    const PROFILE_JOB_WEIGHT = 0.4;


    const jobScores: Record<string, number> = {};

    // Create a Set of job IDs from jobsWithSimilarities for easy lookup
    const recentJobIdsSet = new Set(jobsWithSimilarities.map(job => job._id.toString()));

    // Rank jobs based on similarity to the user's profile
    const topUserJobs = rankJobsByProfile(profile, jobsWithSimilarities);
    topUserJobs.forEach(jobId => {
        if (!jobScores[jobId]) {
            jobScores[jobId] = 0;
        }
        jobScores[jobId] += PROFILE_JOB_WEIGHT;  // Adding a score of 1 * weight for jobs ranked by profile
    });

    // Add scores for jobs similar to jobs the user has added
    jobsWithSimilarities.forEach(job => {
        if (userJobs.includes(job._id.toString()) && job.similarJobs) {
            job.similarJobs.forEach(similarJob => {
                // Check if the similarJob exists in the recent jobs list (within the last two weeks)
                if (!recentJobIdsSet.has(similarJob.jobId)) {
                    return;  // Skip processing for this similarJob
                }

                if (!jobScores[similarJob.jobId]) {
                    jobScores[similarJob.jobId] = 0;
                }

                // Check if the job is not already applied for by the user
                if (!userJobs.includes(similarJob.jobId)) {
                    jobScores[similarJob.jobId] += SIMILAR_JOB_WEIGHT;
                }
            });
        }
    });

    // Sort jobIds by their scores in descending order
    const sortedJobIds = Object.entries(jobScores)
        .filter(([jobId,]) => recentJobIdsSet.has(jobId))
        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
        .map(([jobId]) => jobId)
        .slice(0, 100);

    //console.log(sortedJobIds)

    return sortedJobIds;
}











