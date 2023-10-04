const stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]


export function removeDetailSections(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // If the current property is an object or array, recurse into it
        //console.log("Is an object")
        //console.log(obj[key])
        removeDetailSections(obj[key]);
      }
  
      // If the current property is named "detail", delete it
      if (key === 'detail') {
        //console.log("to be deleted")
        //console.log(obj[key])
        delete obj[key];
      }
    }
    return obj;
  }
  
  // Function to convert job into string
  
  function extractStringValues(obj: any): string {
    const excludedKeys = ["_id", "createdAt", "updatedAt", 'company', 'location', 'employmentType', 'salaryRange', 'remote'];
  
    if (obj === null || typeof obj === 'undefined') {
      return '';
    }
    if (typeof obj === 'string') {
      const cleanString = obj.replace(/[^a-zA-Z\s]/g, '');
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
  
  export function createJobKeywords(obj: any) {
    const singleWords = extractStringValues(obj).split(' ').filter(s => s != '').filter(s => !stopwords.includes(s.toLowerCase()))


    const wordCounts = singleWords.reduce((acc: Record<string, number>, word: string) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {});

    const sortedWordEntries = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])  // Sort by frequency, in descending order
        .slice(0, 10);  // Take the top 10

    // Extract words and their frequencies
    const topWords = sortedWordEntries.map(entry => entry[0]);
    const topWordFrequencies = sortedWordEntries.map(entry => entry[1]);

    // Filter words that occur more than two times
    const frequentWords = singleWords.filter(word => wordCounts[word] > 2);

    const jobKeyWords = Array.from(new Set(frequentWords)) // Use a Set to remove any duplicates and then convert it back to an array

    return {jobKeyWords, topWords}; 
}
  