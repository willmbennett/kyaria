import { Award, Certification, Education, ProfessionalExperience, Project, Publication, ResumeClass } from "../../models/Resume";
import { ResumeScanDataClass } from "../../models/ResumeScan";

export const demoResume = { "ContactInformation": { "CandidateName": { "FormattedName": "Will Bennett", "GivenName": "Will", "FamilyName": "Bennett" }, "Telephones": [{ "Raw": "207-239-0234", "Normalized": "+1 207-239-0234", "InternationalCountryCode": "1", "AreaCityCode": "207", "SubscriberNumber": "239-0234" }], "EmailAddresses": ["will@kyaria.ai"], "Location": { "CountryCode": "US", "Regions": ["CA"], "Municipality": "Cupertino" } }, "Education": { "HighestDegree": { "Name": { "Raw": "AB in Engineering Science", "Normalized": "bachelors" }, "Type": "bachelors" }, "EducationDetails": [{ "Id": "DEG-1", "Text": "Flatiron School, New York, NY\n04/2023 - 07/2023\nApplied machine learning methodologies to end stage liver disease to improve outcome prediction (0.86 C-statistic vs. 0.78 gold standard MELD score).\nBuilt ALS Spark recommendation systems in python using the MovieLens dataset (0.87 RMSE vs Net fl ix competition winner 0.8567 RMSE).\nPredicted h1n1 vaccination status of 26k survey respondents using machine learning.", "SchoolName": { "Raw": "Flatiron School", "Normalized": "Flatiron School" }, "SchoolType": "UNSPECIFIED", "Location": { "CountryCode": "US", "Regions": ["NY"], "Municipality": "New York" }, "Majors": ["MovieLens dataset"], "LastEducationDate": { "Date": "2023-07-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "StartDate": { "Date": "2023-04-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2023-07-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false } }, { "Id": "DEG-2", "Text": "Udemy\n12/2019 - 03/2021\nBusiness Analysis, Advanced Web Development, Algorithms, Data Structures", "SchoolName": { "Raw": "Udemy", "Normalized": "Udemy" }, "SchoolType": "UNSPECIFIED", "Majors": ["Business Analysis"], "LastEducationDate": { "Date": "2021-03-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "StartDate": { "Date": "2019-12-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2021-03-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false } }, { "Id": "DEG-3", "Text": "Dartmouth College, Hanover, NH\n06/ 2017\nDual Degree: AB in Engineering Science, BE in Electrical Engineering", "SchoolName": { "Raw": "Dartmouth College", "Normalized": "Dartmouth College" }, "SchoolType": "university", "Location": { "CountryCode": "US", "Regions": ["NH"], "Municipality": "Hanover" }, "Degree": { "Name": { "Raw": "AB in Engineering Science", "Normalized": "bachelors" }, "Type": "bachelors" }, "Majors": ["Electrical Engineering"], "LastEducationDate": { "Date": "2017-06-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2017-06-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false } }] }, "EmploymentHistory": { "ExperienceSummary": { "Description": "Will Bennett is experienced in the management of: Information and Communication Technology (IT R&D Professionals); and Communication, Marketing and Public Relations (Communication, Marketing and Public Relations Managers). Will Bennett has 5 years of work experience, with 4 years of management experience, including a high-level position.", "MonthsOfWorkExperience": 65, "MonthsOfManagementExperience": 42, "ExecutiveType": "GENERAL", "AverageMonthsPerEmployer": 32, "FulltimeDirectHirePredictiveIndex": 42, "ManagementStory": "Current position is a executive-level management role: Co-Founder\nStarting on 8/1/2023, the candidate held the following executive-level management position for 2 months:\n\tTitle: Co-Founder for Kyaria.ai\nStarting on 1/1/2022, the candidate held the following low-level management position for 14 months:\n\tTitle: Product Manager for Doximity\nStarting on 1/1/2018, the candidate held the following low-level management position for 2 years and 1 months:\n\tTitle: Associate Product Manager for Doximity", "CurrentManagementLevel": "executive-level", "ManagementScore": 100 }, "Positions": [{ "Id": "POS-1", "Employer": { "Name": { "Probability": "Confident", "Raw": "Kyaria.ai", "Normalized": "Kyaria.ai" }, "Location": { "CountryCode": "US", "Regions": ["CA"], "Municipality": "Cupertino" } }, "IsSelfEmployed": true, "IsCurrent": true, "JobTitle": { "Raw": "Co-Founder", "Normalized": "Co Founder", "Probability": "Confident" }, "StartDate": { "Date": "2023-08-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2023-10-21", "IsCurrentDate": true, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "JobType": "directHire", "JobLevel": "Senior Executive (President, C-level)", "TaxonomyPercentage": 0, "Description": "Created a service to help job-seekers with fi nd jobs, focused on interview preparation with over 50 users in the open beta.\nDeveloped a single-page NextJS+MongoDB application, utilizing App Router, server actions, streaming, and resume parsing.\nUtilized OpenAI's gpt-4 LLM to generate resumes, cover letters, personal stories, STAR stories about accomplishments." }, { "Id": "POS-2", "Employer": { "Name": { "Probability": "Confident", "Raw": "Doximity", "Normalized": "Doximity" }, "Location": { "CountryCode": "US", "Regions": ["CA"], "Municipality": "San Francisco" } }, "RelatedToByCompanyName": ["POS-3", "POS-4"], "IsSelfEmployed": false, "IsCurrent": false, "JobTitle": { "Raw": "Product Manager", "Normalized": "Product Manager", "Probability": "Confident" }, "StartDate": { "Date": "2022-01-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2023-03-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "JobType": "directHire", "JobLevel": "Manager", "TaxonomyPercentage": 0, "Description": "Collaborated cross-functionally with engineering, data, design, sales, and marketing teams to revamp ad targeting product.\nImproved client ROIs by designing and implementing framework with data scientist to target users with ad inventory.\nLaunched a novel high-priority tool with data and engineering within 10 days, enabling $7M in sales in fi rst 3 months.\nReduced pricing errors by $200K by working with engineers to fi x issues with auto-generated pricing." }, { "Id": "POS-3", "Employer": { "Name": { "Probability": "Confident", "Raw": "Doximity", "Normalized": "Doximity" }, "Location": { "CountryCode": "US", "Regions": ["CA"], "Municipality": "San Francisco" } }, "RelatedToByCompanyName": ["POS-2", "POS-4"], "IsSelfEmployed": false, "IsCurrent": false, "JobTitle": { "Raw": "Business Analyst", "Normalized": "Business Analyst", "Probability": "Confident" }, "StartDate": { "Date": "2020-02-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2022-01-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "JobType": "directHire", "JobLevel": "Entry Level", "TaxonomyPercentage": 0, "Description": "Analyzed business impact with SQL and worked with pricing director to o ff er Telemedicine product ad-free during COVID-19.\nGenerated $60M+ in revenue working with pricing director and BizOps SVP on price changes by analyzing user activity in SQL.\nOptimized ad performance reviews, elevating goal attainment from 95% to 99% by leveraging Excel and Looker analytics." }, { "Id": "POS-4", "Employer": { "Name": { "Probability": "Confident", "Raw": "Doximity", "Normalized": "Doximity" }, "Location": { "CountryCode": "US", "Regions": ["CA"], "Municipality": "San Francisco" } }, "RelatedToByCompanyName": ["POS-2", "POS-3"], "IsSelfEmployed": false, "IsCurrent": false, "JobTitle": { "Raw": "Associate Product Manager", "Normalized": "Associate Product Manager", "Probability": "Confident" }, "StartDate": { "Date": "2018-01-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2020-02-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "JobType": "directHire", "JobLevel": "Entry Level", "TaxonomyPercentage": 0, "Description": "Provided robust support for the rollout of a major user\nfl ow change impacting 300k monthly active users (MAU).\nImproved marketing email CTR by 3% with an AB test working with design team that is now current email gold standard.\nWorked with data scientists to build dimensional models, built BI dashboard for goals and KPI monitoring, planned and executed switch to Looker." }] }, "Skills": { "Raw": [{ "Name": "Agile Development", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Algorithms", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-2" }], "MonthsExperience": { "Value": 15 }, "LastUsed": { "Value": "2021-03-01" } }, { "Name": "BigQuery", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Business Analysis", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-2" }], "MonthsExperience": { "Value": 15 }, "LastUsed": { "Value": "2021-03-01" } }, { "Name": "business impact", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "COVID-19.", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "dashboard", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-4" }], "MonthsExperience": { "Value": 25 }, "LastUsed": { "Value": "2020-02-01" } }, { "Name": "Data Science", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Data Structures", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-2" }], "MonthsExperience": { "Value": 15 }, "LastUsed": { "Value": "2021-03-01" } }, { "Name": "Electrical Engineering", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-3" }], "LastUsed": { "Value": "2017-06-01" } }, { "Name": "engineering", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 14 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Engineering Science", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-3" }], "LastUsed": { "Value": "2017-06-01" } }, { "Name": "Excel", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "gpt-4", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-10-21" } }, { "Name": "inventory.", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 14 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "JavaScript", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Jira", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Keras", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "KPI monitoring", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-4" }], "MonthsExperience": { "Value": 25 }, "LastUsed": { "Value": "2020-02-01" } }, { "Name": "Lifecycle Management", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "liver", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "LLM", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-10-21" } }, { "Name": "Looker", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-4" }], "MonthsExperience": { "Value": 25 }, "LastUsed": { "Value": "2020-02-01" } }, { "Name": "Looker analytics", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "machine learning", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "marketing", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }, { "SectionType": "WORK HISTORY", "Id": "POS-4" }], "MonthsExperience": { "Value": 39 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Mixpanel", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "MongoDB", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-10-21" } }, { "Name": "NextJS", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-10-21" } }, { "Name": "Node.js", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Object Oriented", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "performance reviews", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "Predicted", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "prediction", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "pricing", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }, { "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 37 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Product Lifecycle", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Product Management", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Product Manager", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }, { "SectionType": "WORK HISTORY", "Id": "POS-4" }], "MonthsExperience": { "Value": 39 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Python", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "React.js", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "recommendation systems", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "Router", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-10-21" } }, { "Name": "sales", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 14 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Salesforce", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Scrum", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Spark", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "SQL", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "statistic", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "Tableau", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Tailwind CSS", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Telemedicine", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "TensorFlow", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "UX research", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Web Development", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "EDUCATION", "Id": "DEG-2" }], "MonthsExperience": { "Value": 15 }, "LastUsed": { "Value": "2021-03-01" } }, { "Name": "Wireframing", "FoundIn": [{ "SectionType": "SKILLS" }] }] }, "LanguageCompetencies": [{ "Language": "English", "LanguageCode": "en", "FoundInContext": "[RESUME_LANGUAGE]" }], "QualificationsSummary": "SKILLS\nProduct Management\nJira, Roadmapping, UX research, Agile Development, Product Lifecycle Management, Wireframing, Scrum, Salesforce\nData Science\nSQL, Looker, Google Colab, Mixpanel, Tableau, Snow fl ake, BigQuery, Excel, Python, TensorFlow, Keras, Object Oriented\nWeb Development\nNextJS, MongoDB, React.js, Node.js, JavaScript, Tailwind CSS", "ResumeMetadata": { "FoundSections": [{ "FirstLineNumber": 8, "LastLineNumber": 14, "SectionType": "SKILLS", "HeaderTextFound": "SKILLS" }, { "FirstLineNumber": 15, "LastLineNumber": 41, "SectionType": "WORK HISTORY", "HeaderTextFound": "EXPERIENCE" }, { "FirstLineNumber": 42, "LastLineNumber": 55, "SectionType": "EDUCATION", "HeaderTextFound": "EDUCATION" }], "ResumeQuality": [{ "Level": "Data Missing", "Findings": [{ "QualityCode": "213", "Message": "A street level address was not found in the contact information. A full contact address should always be included in a resume as it allows for location based searches." }, { "QualityCode": "231", "SectionIdentifiers": [{ "SectionType": "DEG-1" }, { "SectionType": "DEG-2" }], "Message": "Every degree in a resume should have a name or type associated with it, such as 'B.S.' or 'M.S.'." }] }, { "Level": "Suggested Improvements", "Findings": [{ "QualityCode": "161", "Message": "High school (or lower) education should not be included on resumes that contain higher-level education." }, { "QualityCode": "112", "Message": "The following section was identified as a skills section type: 'SKILLS'. Skills should not be in a separate section, but instead, each skill should be included in the descriptions of work history or education. THIS IS INCREDIBLY IMPORTANT FOR AI MATCHING ALGORITHMS" }] }], "ReservedData": { "Phones": ["207-239-0234"], "Names": ["Will Bennett"], "EmailAddresses": ["will@kyaria.ai"], "Urls": ["Kyaria.ai"] }, "PlainText": "Will Bennett\nCupertino, CA\n|\n207-239-0234 | will@kyaria.ai | Github | Linkedin\nTECHNICAL PRODUCT MANAGER\nData-savvy Technical Product Manager with a proven track record in driving product innovation through expertise in data\nanalysis, machine learning, and statistical modeling.\nSkilled at utilizing data-driven insights for decision-making, leading\ncross-functional teams, and launching products that exceed business objectives and deliver exceptional customer value\nSKILLS\nProduct Management\nJira, Roadmapping, UX research, Agile Development, Product Lifecycle Management, Wireframing, Scrum, Salesforce\nData Science\nSQL, Looker, Google Colab, Mixpanel, Tableau, Snow fl ake, BigQuery, Excel, Python, TensorFlow, Keras, Object Oriented\nWeb Development\nNextJS, MongoDB, React.js, Node.js, JavaScript, Tailwind CSS\nEXPERIENCE\nCo-Founder, Kyaria.ai, Cupertino, CA\n08/2023 - present\n●\nCreated a service to help job-seekers with\nfi nd jobs, focused on interview preparation with over 50 users in the open beta.\n●\nDeveloped a single-page NextJS+MongoDB application, utilizing App Router, server actions, streaming, and resume parsing.\n●\nUtilized OpenAI's gpt-4 LLM to generate resumes, cover letters, personal stories, STAR stories about accomplishments.\nProduct Manager, Doximity, San Francisco, CA\n01/2022 - 03/2023\n●\nCollaborated cross-functionally with engineering, data, design, sales, and marketing teams to revamp ad targeting product.\n●\nImproved client ROIs by designing and implementing framework with data scientist to target users with ad inventory.\n●\nLaunched a novel high-priority tool with data and engineering within 10 days, enabling $7M in sales in\nfi rst 3 months.\n●\nReduced pricing errors by $200K by working with engineers to\nfi x issues with auto-generated pricing.\nBusiness Analyst, Doximity, San Francisco, CA\n02/2020 - 01/2022\n●\nAnalyzed business impact with SQL and worked with pricing director to o ff er Telemedicine product ad-free during COVID-19.\n●\nGenerated $60M+ in revenue working with pricing director and BizOps SVP on price changes by analyzing user activity in SQL.\n●\nOptimized ad performance reviews, elevating goal attainment from 95% to 99% by leveraging Excel and Looker analytics.\nAssociate Product Manager, Doximity, San Francisco, CA\n01/2018 - 02/2020\n●\nProvided robust support for the rollout of a major user\nfl ow change impacting 300k monthly active users (MAU).\n●\nImproved marketing email CTR by 3% with an AB test working with design team that is now current email gold standard.\n●\nWorked with data scientists to build dimensional models, built BI dashboard for goals and KPI monitoring, planned and\nexecuted switch to Looker.\nEDUCATION\nFlatiron School, New York, NY\n04/2023 - 07/2023\n●\nApplied machine learning methodologies to end stage liver disease to improve outcome prediction (0.86 C-statistic vs.\n0.78 gold standard MELD score).\n●\nBuilt ALS Spark recommendation systems in python using the MovieLens dataset (0.87 RMSE vs Net fl ix competition\nwinner 0.8567 RMSE).\n●\nPredicted h1n1 vaccination status of 26k survey respondents using machine learning.\nUdemy\n12/2019 - 03/2021\nBusiness Analysis, Advanced Web Development, Algorithms, Data Structures\nDartmouth College, Hanover, NH\n06/ 2017\nDual Degree: AB in Engineering Science, BE in Electrical Engineering", "DocumentLanguage": "en", "DocumentCulture": "en-US", "ParserSettings": "Coverage.PersonalAttributes = True; Coverage.Training = True; Culture.CountryCodeForUnitedKingdomIsUK = True; Culture.DefaultCountryCode = US; Culture.Language = English; Culture.PreferEnglishVersionIfTwoLanguagesInDocument = False; Data.UserDefinedParsing = False; Data.UseV2SkillsTaxonomy = True; OutputFormat.AssumeCompanyNameFromPrecedingJob = False; OutputFormat.ContactMethod.PackStyle = Split; OutputFormat.DateOutputStyle = ExplicitlyKnownDateInfoOnly; OutputFormat.NestJobsBasedOnDateRanges = True; OutputFormat.NormalizeRegions = False; OutputFormat.SimpleCustomLinkedIn = False; OutputFormat.SkillsStyle = Default; OutputFormat.StripParsedDataFromPositionHistoryDescription = True; OutputFormat.TelcomNumber.Style = Raw; OutputFormat.XmlFormat = HrXmlResume25", "DocumentLastModified": "2023-10-21" } }


export function transformParsedResume(sourceData: ResumeScanDataClass): ResumeClass {
    let transformedData: ResumeClass = {name: '', email: '', social_links: {}, userId: '', _id: ''};

    // Transform contact data
    if (sourceData.ContactInformation) {
        transformedData.name = sourceData.ContactInformation.CandidateName ? sourceData.ContactInformation.CandidateName.FormattedName : '';
        transformedData.email = sourceData.ContactInformation.EmailAddresses && sourceData.ContactInformation.EmailAddresses.length > 0 ? sourceData.ContactInformation.EmailAddresses[0] : '';
        transformedData.phone = sourceData.ContactInformation.Telephones && sourceData.ContactInformation.Telephones.length > 0 ? sourceData.ContactInformation.Telephones[0].Normalized : '';
        // Extract social links and other details if available
        transformedData.social_links = {}; // Initialize as empty object
        if (sourceData.ContactInformation.WebAddresses) {
            sourceData.ContactInformation.WebAddresses.forEach(webAddress => {
                transformedData.social_links[webAddress.Type] = webAddress.Address;
            });
        }
        // Location
        transformedData.location = sourceData.ContactInformation.Location ? `${sourceData.ContactInformation.Location.Municipality}, ${sourceData.ContactInformation.Location.CountryCode}` : '';
    }

    // Transform professional summary
    transformedData.summary = sourceData.ProfessionalSummary || '';

    // Transform education data
    if (sourceData.Education && sourceData.Education.EducationDetails) {
        transformedData.education = sourceData.Education.EducationDetails.map(detail => ({
            degree: detail.Degree ? detail.Degree.Name.Raw : '',
            institution: detail.SchoolName ? detail.SchoolName.Raw : '',
            location: detail.Location ? (detail.Location.Municipality || detail.Location.CountryCode) : '',
            start_date: detail.StartDate ? detail.StartDate.Date : '',
            end_date: detail.EndDate ? detail.EndDate.Date : '',
            details: detail.Text ? detail.Text.split('\n').map(text => ({
                content: text.trim(),
                detail: '' // Leaving empty as no equivalent field in source structure.
            })) : [],
        }));
    }

    // Transform employment data
    if (sourceData.EmploymentHistory && sourceData.EmploymentHistory.Positions) {
        transformedData.professional_experience = sourceData.EmploymentHistory.Positions.map(position => ({
            title: position.JobTitle ? position.JobTitle.Raw : '',
            company: position.Employer && position.Employer.Name ? position.Employer.Name.Raw : '',
            location: position.Employer && position.Employer.Location ? (position.Employer.Location.Municipality || position.Employer.Location.CountryCode) : '',
            start_date: position.StartDate ? position.StartDate.Date : '',
            end_date: position.EndDate ? position.EndDate.Date : '',
            responsibilities: position.Description ? position.Description.split('\n').map(text => ({
                content: text.trim(),
                detail: '' // Leaving empty as no equivalent field in source structure.
            })) : [],
        }));
    }

    // Transform skills data
    if (sourceData.Skills && sourceData.Skills.Raw) {
        transformedData.skills = sourceData.Skills.Raw
            .sort((a, b) => (b.MonthsExperience?.Value || 1) - (a.MonthsExperience?.Value || 1))
            .map(skill => skill.Name);
    }

    // Additional fields like Certifications, Licenses, etc., can be transformed similarly
    // based on their presence and relevance

    return transformedData;
}

export type ResumeBuilderFormData = {
    education: Education[];
    professional_experience: ProfessionalExperience[];
    projects: Project[];
    publications?: Publication[];
    awards?: Award[];
    certifications?: Certification[];
    interests: { label: string; value: string }[];
    skills: { label: string; value: string }[];
    social_links: { name: string, url: string }[]
    summary?: string;
    name?: string;
    phone?: string;
    email?: string;
    location?: string;
    title?: string;
};

export type FieldConfig = {
    name: string;
    placeholder: string;
    type: 'text' | 'textarea' | 'date' | 'gpa' | 'bulletPoints';
    group?: string;
};

type ListSectionConfig = {
    id: string;
    sectionType: 'list';
};

type GeneralSectionConfig = {
    id: string;
    sectionType: 'section';
    title: string;
    sectionName: string;
    fieldsConfig: FieldConfig[];
};

type SectionConfig = ListSectionConfig | GeneralSectionConfig;


export const sectionConfigs: SectionConfig[] = [
    {
        id: 'skills',
        sectionType: 'list'
    },
    {
        id: 'interests',
        sectionType: 'list'
    },
    {
        id: 'professional_experience',
        sectionType: 'section',
        title: 'Experience',
        sectionName: 'professional_experience',
        fieldsConfig: [
            { name: "company", placeholder: "Employer Name", type: "text", group: "emp" },
            { name: "title", placeholder: "Job Title", type: "text", group: "emp" },
            { name: "location", placeholder: "Location", type: "text" },
            { name: "start_date", placeholder: "Start Date", type: "date", group: "emp-date" },
            { name: "end_date", placeholder: "End Date", type: "date", group: "emp-date" },
            { name: "summary", placeholder: "Summary", type: "textarea" },
            { name: "responsibilities", placeholder: "Bullets", type: "bulletPoints" }
        ]
    },
    {
        id: 'projects',
        sectionType: 'section',
        title: 'Projects',
        sectionName: 'projects',
        fieldsConfig: [
            { name: "name", placeholder: "Project Name", type: "text", group: "org" },
            { name: "organization", placeholder: "Organization", type: "text", group: "org" },
            { name: "Link", placeholder: "Link URL", type: "text", group: "link" },
            { name: "Link", placeholder: "Link URL", type: "text", group: "link" },
            { name: "location", placeholder: "Location", type: "text" },
            { name: "start_date", placeholder: "Start Date", type: "date", group: "emp-date" },
            { name: "end_date", placeholder: "End Date", type: "date", group: "emp-date" },
            { name: "details", placeholder: "Bullets", type: "bulletPoints" }
        ]
    },
    {
        id: 'education',
        sectionType: 'section',
        title: 'Education',
        sectionName: 'education',
        fieldsConfig: [
            { name: "institution", placeholder: "School Name", type: "text", group: "edu" },
            { name: "degree", placeholder: "Degree", type: "text", group: "edu" },
            { name: "location", placeholder: "Location", type: "text" },
            { name: "GPA", placeholder: "GPA", type: "gpa" },
            { name: "start_date", placeholder: "Start Date", type: "date", group: "edu-date" },
            { name: "end_date", placeholder: "End Date", type: "date", group: "edu-date" },
            { name: "summary", placeholder: "Summary", type: "textarea" },
            { name: "details", placeholder: "Bullets", type: "bulletPoints" }
        ]
    },
    {
        id: 'publications',
        sectionType: 'section',
        title: 'Publications',
        sectionName: 'publications',
        fieldsConfig: [
            { name: "publication", placeholder: "Publication", type: "text", group: "pub" },
            { name: "publisher", placeholder: "Publisher", type: "text", group: "pub" },
            { name: "date", placeholder: "Date", type: "date" },
        ]
    },
    {
        id: 'awards',
        sectionType: 'section',
        title: 'Awards',
        sectionName: 'awards',
        fieldsConfig: [
            { name: "award", placeholder: "Award Name", type: "text", group: "award" },
            { name: "organization", placeholder: "Organization", type: "text", group: "award" },
            { name: "date", placeholder: "Date", type: "date" },
        ]
    },
    {
        id: 'certifications',
        sectionType: 'section',
        title: 'Certifications',
        sectionName: 'certifications',
        fieldsConfig: [
            { name: "certification", placeholder: "Certification", type: "text", group: "cert" },
            { name: "organization", placeholder: "Organization", type: "text", group: "cert" },
            { name: "provider", placeholder: "Provider", type: "text" },
            { name: "end_date", placeholder: "End Date", type: "date", group: "edu-date" },
            { name: "summary", placeholder: "Summary", type: "textarea" },
        ]
    },
];