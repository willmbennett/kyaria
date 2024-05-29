import { Award, Certification, Education, ProfessionalExperience, Project, Publication, ResumeClass, ResumeModel, Volunteering } from "../../models/Resume";
import { format, parse, isValid, isToday, startOfToday } from 'date-fns';
import { ResumeScanDataClass } from "../../models/ResumeScan";


export const demoResume = { "ContactInformation": { "CandidateName": { "FormattedName": "Will Bennett", "GivenName": "Will", "FamilyName": "Bennett" }, "Telephones": [{ "Raw": "207-239-0234", "Normalized": "+1 207-239-0234", "InternationalCountryCode": "1", "AreaCityCode": "207", "SubscriberNumber": "239-0234" }], "EmailAddresses": ["will@kyaria.ai"], "Location": { "CountryCode": "US", "Regions": ["CA"], "Municipality": "Cupertino" } }, "Education": { "HighestDegree": { "Name": { "Raw": "AB in Engineering Science", "Normalized": "bachelors" }, "Type": "bachelors" }, "EducationDetails": [{ "Id": "DEG-1", "Text": "Flatiron School, New York, NY\n04/2023 - 07/2023\nApplied machine learning methodologies to end stage liver disease to improve outcome prediction (0.86 C-statistic vs. 0.78 gold standard MELD score).\nBuilt ALS Spark recommendation systems in python using the MovieLens dataset (0.87 RMSE vs Net fl ix competition winner 0.8567 RMSE).\nPredicted h1n1 vaccination status of 26k survey respondents using machine learning.", "SchoolName": { "Raw": "Flatiron School", "Normalized": "Flatiron School" }, "SchoolType": "UNSPECIFIED", "Location": { "CountryCode": "US", "Regions": ["NY"], "Municipality": "New York" }, "Majors": ["MovieLens dataset"], "LastEducationDate": { "Date": "2023-07-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "StartDate": { "Date": "2023-04-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2023-07-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false } }, { "Id": "DEG-2", "Text": "Udemy\n12/2019 - 03/2021\nBusiness Analysis, Advanced Web Development, Algorithms, Data Structures", "SchoolName": { "Raw": "Udemy", "Normalized": "Udemy" }, "SchoolType": "UNSPECIFIED", "Majors": ["Business Analysis"], "LastEducationDate": { "Date": "2021-03-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "StartDate": { "Date": "2019-12-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2021-03-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false } }, { "Id": "DEG-3", "Text": "Dartmouth College, Hanover, NH\n06/ 2017\nDual Degree: AB in Engineering Science, BE in Electrical Engineering", "SchoolName": { "Raw": "Dartmouth College", "Normalized": "Dartmouth College" }, "SchoolType": "university", "Location": { "CountryCode": "US", "Regions": ["NH"], "Municipality": "Hanover" }, "Degree": { "Name": { "Raw": "AB in Engineering Science", "Normalized": "bachelors" }, "Type": "bachelors" }, "Majors": ["Electrical Engineering"], "LastEducationDate": { "Date": "2017-06-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2017-06-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false } }] }, "EmploymentHistory": { "ExperienceSummary": { "Description": "Will Bennett is experienced in the management of: Information and Communication Technology (IT R&D Professionals); and Communication, Marketing and Public Relations (Communication, Marketing and Public Relations Managers). Will Bennett has 5 years of work experience, with 4 years of management experience, including a high-level position.", "MonthsOfWorkExperience": 65, "MonthsOfManagementExperience": 42, "ExecutiveType": "GENERAL", "AverageMonthsPerEmployer": 32, "FulltimeDirectHirePredictiveIndex": 42, "ManagementStory": "Current position is a executive-level management role: Co-Founder\nStarting on 8/1/2023, the candidate held the following executive-level management position for 2 months:\n\tTitle: Co-Founder for Kyaria.ai\nStarting on 1/1/2022, the candidate held the following low-level management position for 14 months:\n\tTitle: Product Manager for Doximity\nStarting on 1/1/2018, the candidate held the following low-level management position for 2 years and 1 months:\n\tTitle: Associate Product Manager for Doximity", "CurrentManagementLevel": "executive-level", "ManagementScore": 100 }, "Positions": [{ "Id": "POS-1", "Employer": { "Name": { "Probability": "Confident", "Raw": "Kyaria.ai", "Normalized": "Kyaria.ai" }, "Location": { "CountryCode": "US", "Regions": ["CA"], "Municipality": "Cupertino" } }, "IsSelfEmployed": true, "IsCurrent": true, "JobTitle": { "Raw": "Co-Founder", "Normalized": "Co Founder", "Probability": "Confident" }, "StartDate": { "Date": "2023-08-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2023-10-21", "IsCurrentDate": true, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "JobType": "directHire", "JobLevel": "Senior Executive (President, C-level)", "TaxonomyPercentage": 0, "Description": "Created a service to help job-seekers with fi nd jobs, focused on interview preparation with over 50 users in the open beta.\nDeveloped a single-page NextJS+MongoDB application, utilizing App Router, server actions, streaming, and resume parsing.\nUtilized OpenAI's gpt-4 LLM to generate resumes, cover letters, personal stories, STAR stories about accomplishments." }, { "Id": "POS-2", "Employer": { "Name": { "Probability": "Confident", "Raw": "Doximity", "Normalized": "Doximity" }, "Location": { "CountryCode": "US", "Regions": ["CA"], "Municipality": "San Francisco" } }, "RelatedToByCompanyName": ["POS-3", "POS-4"], "IsSelfEmployed": false, "IsCurrent": false, "JobTitle": { "Raw": "Product Manager", "Normalized": "Product Manager", "Probability": "Confident" }, "StartDate": { "Date": "2022-01-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2023-03-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "JobType": "directHire", "JobLevel": "Manager", "TaxonomyPercentage": 0, "Description": "Collaborated cross-functionally with engineering, data, design, sales, and marketing teams to revamp ad targeting product.\nImproved client ROIs by designing and implementing framework with data scientist to target users with ad inventory.\nLaunched a novel high-priority tool with data and engineering within 10 days, enabling $7M in sales in fi rst 3 months.\nReduced pricing errors by $200K by working with engineers to fi x issues with auto-generated pricing." }, { "Id": "POS-3", "Employer": { "Name": { "Probability": "Confident", "Raw": "Doximity", "Normalized": "Doximity" }, "Location": { "CountryCode": "US", "Regions": ["CA"], "Municipality": "San Francisco" } }, "RelatedToByCompanyName": ["POS-2", "POS-4"], "IsSelfEmployed": false, "IsCurrent": false, "JobTitle": { "Raw": "Business Analyst", "Normalized": "Business Analyst", "Probability": "Confident" }, "StartDate": { "Date": "2020-02-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2022-01-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "JobType": "directHire", "JobLevel": "Entry Level", "TaxonomyPercentage": 0, "Description": "Analyzed business impact with SQL and worked with pricing director to o ff er Telemedicine product ad-free during COVID-19.\nGenerated $60M+ in revenue working with pricing director and BizOps SVP on price changes by analyzing user activity in SQL.\nOptimized ad performance reviews, elevating goal attainment from 95% to 99% by leveraging Excel and Looker analytics." }, { "Id": "POS-4", "Employer": { "Name": { "Probability": "Confident", "Raw": "Doximity", "Normalized": "Doximity" }, "Location": { "CountryCode": "US", "Regions": ["CA"], "Municipality": "San Francisco" } }, "RelatedToByCompanyName": ["POS-2", "POS-3"], "IsSelfEmployed": false, "IsCurrent": false, "JobTitle": { "Raw": "Associate Product Manager", "Normalized": "Associate Product Manager", "Probability": "Confident" }, "StartDate": { "Date": "2018-01-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2020-02-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "JobType": "directHire", "JobLevel": "Entry Level", "TaxonomyPercentage": 0, "Description": "Provided robust support for the rollout of a major user\nfl ow change impacting 300k monthly active users (MAU).\nImproved marketing email CTR by 3% with an AB test working with design team that is now current email gold standard.\nWorked with data scientists to build dimensional models, built BI dashboard for goals and KPI monitoring, planned and executed switch to Looker." }] }, "Skills": { "Raw": [{ "Name": "Agile Development", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Algorithms", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-2" }], "MonthsExperience": { "Value": 15 }, "LastUsed": { "Value": "2021-03-01" } }, { "Name": "BigQuery", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Business Analysis", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-2" }], "MonthsExperience": { "Value": 15 }, "LastUsed": { "Value": "2021-03-01" } }, { "Name": "business impact", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "COVID-19.", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "dashboard", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-4" }], "MonthsExperience": { "Value": 25 }, "LastUsed": { "Value": "2020-02-01" } }, { "Name": "Data Science", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Data Structures", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-2" }], "MonthsExperience": { "Value": 15 }, "LastUsed": { "Value": "2021-03-01" } }, { "Name": "Electrical Engineering", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-3" }], "LastUsed": { "Value": "2017-06-01" } }, { "Name": "engineering", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 14 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Engineering Science", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-3" }], "LastUsed": { "Value": "2017-06-01" } }, { "Name": "Excel", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "gpt-4", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-10-21" } }, { "Name": "inventory.", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 14 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "JavaScript", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Jira", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Keras", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "KPI monitoring", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-4" }], "MonthsExperience": { "Value": 25 }, "LastUsed": { "Value": "2020-02-01" } }, { "Name": "Lifecycle Management", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "liver", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "LLM", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-10-21" } }, { "Name": "Looker", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-4" }], "MonthsExperience": { "Value": 25 }, "LastUsed": { "Value": "2020-02-01" } }, { "Name": "Looker analytics", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "machine learning", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "marketing", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }, { "SectionType": "WORK HISTORY", "Id": "POS-4" }], "MonthsExperience": { "Value": 39 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Mixpanel", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "MongoDB", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-10-21" } }, { "Name": "NextJS", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-10-21" } }, { "Name": "Node.js", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Object Oriented", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "performance reviews", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "Predicted", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "prediction", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "pricing", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }, { "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 37 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Product Lifecycle", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Product Management", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Product Manager", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }, { "SectionType": "WORK HISTORY", "Id": "POS-4" }], "MonthsExperience": { "Value": 39 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Python", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "React.js", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "recommendation systems", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "Router", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-10-21" } }, { "Name": "sales", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 14 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Salesforce", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Scrum", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Spark", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "SQL", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "statistic", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 3 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "Tableau", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Tailwind CSS", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Telemedicine", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "TensorFlow", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "UX research", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Web Development", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "EDUCATION", "Id": "DEG-2" }], "MonthsExperience": { "Value": 15 }, "LastUsed": { "Value": "2021-03-01" } }, { "Name": "Wireframing", "FoundIn": [{ "SectionType": "SKILLS" }] }] }, "LanguageCompetencies": [{ "Language": "English", "LanguageCode": "en", "FoundInContext": "[RESUME_LANGUAGE]" }], "QualificationsSummary": "SKILLS\nProduct Management\nJira, Roadmapping, UX research, Agile Development, Product Lifecycle Management, Wireframing, Scrum, Salesforce\nData Science\nSQL, Looker, Google Colab, Mixpanel, Tableau, Snow fl ake, BigQuery, Excel, Python, TensorFlow, Keras, Object Oriented\nWeb Development\nNextJS, MongoDB, React.js, Node.js, JavaScript, Tailwind CSS", "ResumeMetadata": { "FoundSections": [{ "FirstLineNumber": 8, "LastLineNumber": 14, "SectionType": "SKILLS", "HeaderTextFound": "SKILLS" }, { "FirstLineNumber": 15, "LastLineNumber": 41, "SectionType": "WORK HISTORY", "HeaderTextFound": "EXPERIENCE" }, { "FirstLineNumber": 42, "LastLineNumber": 55, "SectionType": "EDUCATION", "HeaderTextFound": "EDUCATION" }], "ResumeQuality": [{ "Level": "Data Missing", "Findings": [{ "QualityCode": "213", "Message": "A street level address was not found in the contact information. A full contact address should always be included in a resume as it allows for location based searches." }, { "QualityCode": "231", "SectionIdentifiers": [{ "SectionType": "DEG-1" }, { "SectionType": "DEG-2" }], "Message": "Every degree in a resume should have a name or type associated with it, such as 'B.S.' or 'M.S.'." }] }, { "Level": "Suggested Improvements", "Findings": [{ "QualityCode": "161", "Message": "High school (or lower) education should not be included on resumes that contain higher-level education." }, { "QualityCode": "112", "Message": "The following section was identified as a skills section type: 'SKILLS'. Skills should not be in a separate section, but instead, each skill should be included in the descriptions of work history or education. THIS IS INCREDIBLY IMPORTANT FOR AI MATCHING ALGORITHMS" }] }], "ReservedData": { "Phones": ["207-239-0234"], "Names": ["Will Bennett"], "EmailAddresses": ["will@kyaria.ai"], "Urls": ["Kyaria.ai"] }, "PlainText": "Will Bennett\nCupertino, CA\n|\n207-239-0234 | will@kyaria.ai | Github | Linkedin\nTECHNICAL PRODUCT MANAGER\nData-savvy Technical Product Manager with a proven track record in driving product innovation through expertise in data\nanalysis, machine learning, and statistical modeling.\nSkilled at utilizing data-driven insights for decision-making, leading\ncross-functional teams, and launching products that exceed business objectives and deliver exceptional customer value\nSKILLS\nProduct Management\nJira, Roadmapping, UX research, Agile Development, Product Lifecycle Management, Wireframing, Scrum, Salesforce\nData Science\nSQL, Looker, Google Colab, Mixpanel, Tableau, Snow fl ake, BigQuery, Excel, Python, TensorFlow, Keras, Object Oriented\nWeb Development\nNextJS, MongoDB, React.js, Node.js, JavaScript, Tailwind CSS\nEXPERIENCE\nCo-Founder, Kyaria.ai, Cupertino, CA\n08/2023 - present\n●\nCreated a service to help job-seekers with\nfi nd jobs, focused on interview preparation with over 50 users in the open beta.\n●\nDeveloped a single-page NextJS+MongoDB application, utilizing App Router, server actions, streaming, and resume parsing.\n●\nUtilized OpenAI's gpt-4 LLM to generate resumes, cover letters, personal stories, STAR stories about accomplishments.\nProduct Manager, Doximity, San Francisco, CA\n01/2022 - 03/2023\n●\nCollaborated cross-functionally with engineering, data, design, sales, and marketing teams to revamp ad targeting product.\n●\nImproved client ROIs by designing and implementing framework with data scientist to target users with ad inventory.\n●\nLaunched a novel high-priority tool with data and engineering within 10 days, enabling $7M in sales in\nfi rst 3 months.\n●\nReduced pricing errors by $200K by working with engineers to\nfi x issues with auto-generated pricing.\nBusiness Analyst, Doximity, San Francisco, CA\n02/2020 - 01/2022\n●\nAnalyzed business impact with SQL and worked with pricing director to o ff er Telemedicine product ad-free during COVID-19.\n●\nGenerated $60M+ in revenue working with pricing director and BizOps SVP on price changes by analyzing user activity in SQL.\n●\nOptimized ad performance reviews, elevating goal attainment from 95% to 99% by leveraging Excel and Looker analytics.\nAssociate Product Manager, Doximity, San Francisco, CA\n01/2018 - 02/2020\n●\nProvided robust support for the rollout of a major user\nfl ow change impacting 300k monthly active users (MAU).\n●\nImproved marketing email CTR by 3% with an AB test working with design team that is now current email gold standard.\n●\nWorked with data scientists to build dimensional models, built BI dashboard for goals and KPI monitoring, planned and\nexecuted switch to Looker.\nEDUCATION\nFlatiron School, New York, NY\n04/2023 - 07/2023\n●\nApplied machine learning methodologies to end stage liver disease to improve outcome prediction (0.86 C-statistic vs.\n0.78 gold standard MELD score).\n●\nBuilt ALS Spark recommendation systems in python using the MovieLens dataset (0.87 RMSE vs Net fl ix competition\nwinner 0.8567 RMSE).\n●\nPredicted h1n1 vaccination status of 26k survey respondents using machine learning.\nUdemy\n12/2019 - 03/2021\nBusiness Analysis, Advanced Web Development, Algorithms, Data Structures\nDartmouth College, Hanover, NH\n06/ 2017\nDual Degree: AB in Engineering Science, BE in Electrical Engineering", "DocumentLanguage": "en", "DocumentCulture": "en-US", "ParserSettings": "Coverage.PersonalAttributes = True; Coverage.Training = True; Culture.CountryCodeForUnitedKingdomIsUK = True; Culture.DefaultCountryCode = US; Culture.Language = English; Culture.PreferEnglishVersionIfTwoLanguagesInDocument = False; Data.UserDefinedParsing = False; Data.UseV2SkillsTaxonomy = True; OutputFormat.AssumeCompanyNameFromPrecedingJob = False; OutputFormat.ContactMethod.PackStyle = Split; OutputFormat.DateOutputStyle = ExplicitlyKnownDateInfoOnly; OutputFormat.NestJobsBasedOnDateRanges = True; OutputFormat.NormalizeRegions = False; OutputFormat.SimpleCustomLinkedIn = False; OutputFormat.SkillsStyle = Default; OutputFormat.StripParsedDataFromPositionHistoryDescription = True; OutputFormat.TelcomNumber.Style = Raw; OutputFormat.XmlFormat = HrXmlResume25", "DocumentLastModified": "2023-10-21" } }


export const formatDate = (dateDetail: string | undefined) => {
    if (!dateDetail) return ''; // Handle undefined dateDetail
    else if (dateDetail == 'present') return 'Present'; // Handle undefined dateDetail
    try {
        //console.log(dateDetail)
        const parsedDate = parseDate(dateDetail)
        if (parsedDate) {
            if (isToday(parsedDate)) {
                return 'Present';
            }
            else if (parsedDate > startOfToday()) {
                return 'Expected ' + format(parsedDate, 'MMM yyyy');
                //return format(parsedDate, 'MM/yyyy');
            }
            return format(parsedDate, 'MMM yyyy');
        }
    } catch (error) {
        console.error('Invalid date format:', error);
        return dateDetail; // or return a default/fallback value
    }
};

export function transformParsedResume(sourceData: Partial<ResumeScanDataClass>): Partial<ResumeClass> {
    let transformedData: Partial<ResumeClass> = { name: '', email: '', social_links: [] };

    // Transform contact data
    if (sourceData.ContactInformation) {
        transformedData.name = sourceData.ContactInformation.CandidateName ? sourceData.ContactInformation.CandidateName.FormattedName : '';
        transformedData.email = sourceData.ContactInformation.EmailAddresses && sourceData.ContactInformation.EmailAddresses.length > 0 ? sourceData.ContactInformation.EmailAddresses[0] : '';
        transformedData.phone = sourceData.ContactInformation.Telephones && sourceData.ContactInformation.Telephones.length > 0 ? sourceData.ContactInformation.Telephones[0].Normalized : '';
        // Extract social links and other details if available
        transformedData.social_links = []; // Initialize as empty object
        if (sourceData.ContactInformation.WebAddresses) {
            sourceData.ContactInformation.WebAddresses.forEach(webAddress => {
                transformedData.social_links && transformedData.social_links.push({ name: webAddress.Type, url: webAddress.Address })
            });
        }
        // Location
        transformedData.location = sourceData.ContactInformation.Location ? `${sourceData.ContactInformation.Location.Municipality}, ${sourceData.ContactInformation.Location.CountryCode}` : '';
    }

    // Transform professional summary
    transformedData.summary = sourceData.ProfessionalSummary?.replace(/\n/g, ' ') || '';

    // Transform education data
    if (sourceData.Education && sourceData.Education.EducationDetails) {
        transformedData.education = sourceData.Education.EducationDetails.map(detail => ({
            degree: detail.Degree ? detail.Degree.Name.Raw : '',
            institution: detail.SchoolName ? detail.SchoolName.Raw : '',
            location: detail.Location ? (detail.Location.Municipality || detail.Location.CountryCode) : '',
            start_date: detail.StartDate ? detail.StartDate.Date : '',
            end_date: detail.EndDate ? detail.EndDate.Date : '',
            gpa: detail.GPA ? { score: detail.GPA.Score, scoringSystem: detail.GPA.ScoringSystem } : { score: '', scoringSystem: '' },
            details: detail.Text ? detail.Text// Replace newlines not following a period with a space
                .replace(/(?<!\.)\n/g, ' ')
                // Then split by periods followed by newlines to get individual statements
                .split(/\.\n/)
                .map(text => text.trim()) // Add the period back to each sentence
                .filter(text => text !== '.')   // Filter out any empty entries
                .map(text => ({
                    content: text,
                    detail: '' // Keeping this field as per your original structure
                }))
                : [],
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
            responsibilities: position.Description
                ? position.Description
                    // Replace newlines not following a period with a space
                    .replace(/(?<!\.)\n/g, ' ')
                    // Then split by periods followed by newlines to get individual statements
                    .split(/\.\n/)
                    .map(text => text.trim()) // Add the period back to each sentence
                    .filter(text => text !== '.')   // Filter out any empty entries
                    .map(text => ({
                        content: text,
                        detail: '' // Keeping this field as per your original structure
                    }))
                : [],
        }));
    }

    // Transform skills data
    if (sourceData.Skills && sourceData.Skills.Raw) {
        transformedData.skills = sourceData.Skills.Raw
            .sort((a, b) => (b.MonthsExperience?.Value || 1) - (a.MonthsExperience?.Value || 1))
            .map(skill => skill.Name);
    }

    // Transform certifications data
    if (sourceData.Certifications) {
        transformedData.certifications = sourceData.Certifications.map(cert => ({
            certification: cert.Name,
            // Add other fields like 'provider', 'start_date', 'end_date' if they exist in sourceData
            show: true // Default to true, adjust as needed
        }));
    }

    if (sourceData.Publications) {
        transformedData.publications = sourceData.Publications.split(';').map(publication => ({
            publication: publication.trim(),
            // Assuming date and publisher fields are to be parsed from the publication string
            // Add other fields as per your data structure
            show: true
        }));
    }

    // Transform hobbies into interests
    if (sourceData.Hobbies) {
        transformedData.interests = sourceData.Hobbies.split(';').map(hobby => hobby.trim());
    }

    return transformedData;
}

export const parseDate = (dateStr: string): Date | null => {
    if (dateStr.toLowerCase() === 'present') {
        return new Date();
    }

    // List of date formats to try
    const dateFormats = ['MM/yyyy', 'yyyy-MM-dd', 'MM/dd/yyyy', 'MMMM yyyy'];

    let parsedDate;
    for (const format of dateFormats) {
        parsedDate = parse(dateStr, format, new Date());
        if (isValid(parsedDate)) {
            return parsedDate;
        }
    }

    return null; // Return new Date() as a fallback
};

export type sectionType = ProfessionalExperience | Education | Publication | Project | Award | Certification | Volunteering

// Determine the key to sort by. This could be more dynamic based on sectionConfig if needed.
const getSortDateField = (sectionConfig: GeneralSectionConfig): string | null => {
    // Check if 'end_date' field is configured
    const hasEndDate = sectionConfig.fieldsConfig.some(field => field.name === 'end_date');
    if (hasEndDate) return 'end_date';

    // Check if 'date' field is configured
    const hasDate = sectionConfig.fieldsConfig.some(field => field.name === 'date');
    if (hasDate) return 'date';

    // Return null if neither 'end_date' nor 'date' is configured
    return null;
};

// Custom sort function
export const sortDataBasedOnConfig = (data: sectionType[]
    , sectionConfig: GeneralSectionConfig
) => {
    // Get the appropriate date field for sorting
    //console.log(sectionConfig)
    const sortDateField = getSortDateField(sectionConfig);

    // Custom sort function
    const customSort = (a: sectionType, b: sectionType) => {
        if (!sortDateField) return 0; // No sorting if no date field is present

        let returnedValue = 1

        const dateA = a[sortDateField as keyof sectionType]?.toString();
        const dateB = b[sortDateField as keyof sectionType]?.toString();

        const isCurrentDefined = (obj: any): obj is { current: boolean } => {
            return 'current' in obj;
        };

        //console.log('DateA: ', dateA, 'DateB: ', dateB, 'a is current: ', isCurrentDefined(a) && a.current, 'b is current: ', isCurrentDefined(b) && b.current)

        // Handle 'current' or 'present' cases
        if (isCurrentDefined(a) && (a.current || dateA === 'present')) {
            returnedValue = -1;
            //console.log('returnedValue: ', returnedValue)
            return returnedValue
        }
        if (isCurrentDefined(b) && (b.current || dateB === 'present')) {
            returnedValue = 1;
            //console.log('returnedValue: ', returnedValue)
            return returnedValue
        }

        const parsedDateA = dateA ? parseDate(dateA) : null;
        const parsedDateB = dateB ? parseDate(dateB) : null;

        if (!parsedDateA && !parsedDateB) returnedValue = 0;
        if (!parsedDateA) {
            returnedValue = 1;
            //console.log('returnedValue: ', returnedValue)
            return returnedValue
        }
        if (!parsedDateB) {
            returnedValue = -1;
            //console.log('returnedValue: ', returnedValue)
            return returnedValue
        }
        // Convert dates to timestamps for comparison
        const timestampA = parsedDateA.getTime();
        const timestampB = parsedDateB.getTime();

        //console.log('timestampA: ', timestampA, 'timestampB: ', timestampB)

        returnedValue = timestampB - timestampA

        //console.log('returnedValue: ', returnedValue)

        // Sort in descending order
        return returnedValue
    };

    return [...data].sort(customSort);
};
export type sectionOptions = "social_links" | "skills" | "professional_experience" | "education" | "projects" | 'awards' | 'publications' | 'certifications' | 'interests' | 'volunteering'

export type FieldConfig = {
    name: string;
    placeholder: string;
    type: 'text' | 'textarea' | 'date' | 'gpa' | 'bulletPoints' | 'check';
    group?: string;
    pdftype?: 'text' | 'textBold' | 'date' | 'startDate' | 'endDate' | 'current' | 'gpa' | 'bulletPoints' | 'link';
    pdfgroup?: string;
};

type ListSectionConfig = {
    id: string;
    sectionType: 'list';
};

export type GeneralSectionConfig = {
    id: string;
    sectionType: 'section';
    title: string;
    sectionName: string;
    fieldsConfig: FieldConfig[];
};

export type SectionConfig = ListSectionConfig | GeneralSectionConfig;


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
            { name: "title", placeholder: "Job Title", type: "text", group: "emp", pdftype: "textBold", pdfgroup: "title" },
            { name: "company", placeholder: "Employer Name", type: "text", group: "emp", pdftype: "textBold", pdfgroup: "title" },
            { name: "location", placeholder: "Location", type: "text", pdftype: "textBold", pdfgroup: "title" },
            { name: "start_date", placeholder: "Start Date", type: "date", group: "date", pdftype: "startDate", pdfgroup: "title" },
            { name: "end_date", placeholder: "End Date", type: "date", group: "date", pdftype: "endDate", pdfgroup: "title" },
            { name: "current", placeholder: "Is Current", type: "check", group: "date", pdftype: "current", pdfgroup: "title" },
            { name: "summary", placeholder: "Summary", type: "textarea", pdftype: "text", pdfgroup: "body" },
            { name: "responsibilities", placeholder: "Bullets", type: "bulletPoints", pdftype: "bulletPoints", pdfgroup: "body" }
        ]
    },
    {
        id: 'projects',
        sectionType: 'section',
        title: 'Projects',
        sectionName: 'projects',
        fieldsConfig: [
            { name: "name", placeholder: "Project Name", type: "text", group: "org", pdftype: "textBold", pdfgroup: "title" },
            { name: "organization", placeholder: "Organization", type: "text", group: "org", pdftype: "textBold", pdfgroup: "title" },
            { name: "Link", placeholder: "Link URL", type: "text", group: "link", pdftype: "link", pdfgroup: "title" },
            { name: "LinkTitle", placeholder: "Link Title", type: "text", group: "link", pdfgroup: "title" },
            { name: "location", placeholder: "Location", type: "text", pdftype: "textBold", pdfgroup: "title" },
            { name: "start_date", placeholder: "Start Date", type: "date", group: "date", pdftype: "startDate", pdfgroup: "title" },
            { name: "end_date", placeholder: "End Date", type: "date", group: "date", pdftype: "endDate", pdfgroup: "title" },
            { name: "current", placeholder: "Is Current", type: "check", group: "date", pdftype: "current", pdfgroup: "title" },
            { name: "summary", placeholder: "Summary", type: "textarea", pdftype: "text", pdfgroup: "body" },
            { name: "details", placeholder: "Bullets", type: "bulletPoints", pdftype: "bulletPoints", pdfgroup: "body" }
        ]
    },
    {
        id: 'education',
        sectionType: 'section',
        title: 'Education',
        sectionName: 'education',
        fieldsConfig: [
            { name: "degree", placeholder: "Degree", type: "text", group: "edu", pdftype: "text", pdfgroup: "subtitle" },
            { name: "institution", placeholder: "School Name", type: "text", group: "edu", pdftype: "textBold", pdfgroup: "title" },
            { name: "location", placeholder: "Location", type: "text", pdftype: "textBold", pdfgroup: "title" },
            { name: "gpa", placeholder: "GPA", type: "gpa", pdftype: "gpa", pdfgroup: "subtitle" },
            { name: "start_date", placeholder: "Start Date", type: "date", group: "date", pdftype: "startDate", pdfgroup: "title" },
            { name: "end_date", placeholder: "End Date", type: "date", group: "date", pdftype: "endDate", pdfgroup: "title" },
            { name: "summary", placeholder: "Summary", type: "textarea", pdftype: "text", pdfgroup: "body" },
            { name: "details", placeholder: "Bullets", type: "bulletPoints", pdftype: "bulletPoints", pdfgroup: "body" }
        ]
    },
    {
        id: 'publications',
        sectionType: 'section',
        title: 'Publications',
        sectionName: 'publications',
        fieldsConfig: [
            { name: "publication", placeholder: "Publication", type: "text", group: "pub", pdftype: "textBold", pdfgroup: "title" },
            { name: "publisher", placeholder: "Publisher", type: "text", group: "pub", pdftype: "textBold", pdfgroup: "title" },
            { name: "date", placeholder: "Date", type: "date", pdftype: "date", pdfgroup: "title" },
        ]
    },
    {
        id: 'awards',
        sectionType: 'section',
        title: 'Awards',
        sectionName: 'awards',
        fieldsConfig: [
            { name: "award", placeholder: "Award Name", type: "text", group: "award", pdftype: "textBold", pdfgroup: "title" },
            { name: "organization", placeholder: "Organization", type: "text", group: "award", pdftype: "textBold", pdfgroup: "title" },
            { name: "date", placeholder: "Date", type: "date", pdftype: "date", pdfgroup: "title" },
        ]
    },
    {
        id: 'certifications',
        sectionType: 'section',
        title: 'Certifications',
        sectionName: 'certifications',
        fieldsConfig: [
            { name: "certification", placeholder: "Certification", type: "text", group: "cert", pdftype: "textBold", pdfgroup: "title" },
            { name: "provider", placeholder: "Provider", type: "text", group: "cert", pdftype: "textBold", pdfgroup: "title" },
            { name: "start_date", placeholder: "Start Date", type: "date", group: "date", pdftype: "startDate", pdfgroup: "title" },
            { name: "end_date", placeholder: "End Date", type: "date", group: "date", pdftype: "endDate", pdfgroup: "title" },
            { name: "summary", placeholder: "Summary", type: "textarea", pdftype: "text", pdfgroup: "body" },
        ]
    },
    {
        id: 'volunteering',
        sectionType: 'section',
        title: 'Volunteering',
        sectionName: 'volunteering',
        fieldsConfig: [
            { name: "involvement", placeholder: "Involvement", type: "text", group: "name", pdftype: "textBold", pdfgroup: "title" },
            { name: "organization", placeholder: "Organization", type: "text", group: "name", pdftype: "textBold", pdfgroup: "title" },
            { name: "location", placeholder: "Location", type: "text", pdftype: "text", pdfgroup: "title" },
            { name: "start_date", placeholder: "Start Date", type: "date", group: "date", pdftype: "startDate", pdfgroup: "title" },
            { name: "end_date", placeholder: "End Date", type: "date", group: "date", pdftype: "endDate", pdfgroup: "title" },
            { name: "summary", placeholder: "Summary", type: "textarea", pdftype: "text", pdfgroup: "body" },
            { name: "current", placeholder: "Is Current", type: "check", group: "date", pdftype: "current", pdfgroup: "title" },
            { name: "details", placeholder: "Bullets", type: "bulletPoints", pdftype: "bulletPoints", pdfgroup: "body" }
        ]
    },
];


// Test data for resume scan

export const testResumeData: Partial<ResumeScanDataClass> = {
    ProfessionalSummary: "Experienced software engineer with a strong background in web development.",
    Hobbies: "Coding; Photography; Hiking",
    Publications: "Building Scalable Web Apps with React; Advanced Node.js Techniques; The Future of Web Development",
    ContactInformation: {
        "CandidateName": {
            "FormattedName": "Will Bennett",
            "GivenName": "Will",
            "FamilyName": "Bennett"
        },
        "Telephones": [
            {
                "Raw": "207-239-0234",
                "Normalized": "+1 207-239-0234",
                "InternationalCountryCode": "1",
                "AreaCityCode": "207",
                "SubscriberNumber": "239-0234"
            }
        ],
        "EmailAddresses": [
            "wbennett711@gmail.com"
        ],
        "Location": {
            "CountryCode": "US",
            "Regions": [
                "CA"
            ],
            "Municipality": "Cupertino"
        }
    },
    ResumeMetadata: {
        ResumeQuality: [
            {
                Level: "High",
                Findings: [
                    {
                        QualityCode: "Q1",
                        Message: "Well-structured resume"
                    }
                ]
            }
        ]
    },
    Education: {
        "HighestDegree": {
            "Name": {
                "Raw": "AB in Engineering Science",
                "Normalized": "bachelors"
            },
            "Type": "bachelors"
        },
        "EducationDetails": [
            {
                "Id": "DEG-1",
                "Text": "Flatiron School, New York, NY\t04/2023 - 07/2023\nImmersive Data Science Bootcamp program",
                "SchoolName": {
                    "Raw": "Flatiron School",
                    "Normalized": "Flatiron School"
                },
                "SchoolType": "UNSPECIFIED",
                "Location": {
                    "CountryCode": "US",
                    "Regions": [
                        "NY"
                    ],
                    "Municipality": "New York"
                },
                "LastEducationDate": {
                    "Date": "2023-07-01",
                    "IsCurrentDate": false,
                    "FoundYear": true,
                    "FoundMonth": true,
                    "FoundDay": false
                },
                "StartDate": {
                    "Date": "2023-04-01",
                    "IsCurrentDate": false,
                    "FoundYear": true,
                    "FoundMonth": true,
                    "FoundDay": false
                },
                "EndDate": {
                    "Date": "2023-07-01",
                    "IsCurrentDate": false,
                    "FoundYear": true,
                    "FoundMonth": true,
                    "FoundDay": false
                }
            },
            {
                "Id": "DEG-2",
                "Text": "Dartmouth College, Hanover, NH\t06/ 2017\nDual Degree: AB in Engineering Science, BE in Electrical Engineering",
                "SchoolName": {
                    "Raw": "Dartmouth College",
                    "Normalized": "Dartmouth College"
                },
                "SchoolType": "university",
                "Location": {
                    "CountryCode": "US",
                    "Regions": [
                        "NH"
                    ],
                    "Municipality": "Hanover"
                },
                "Degree": {
                    "Name": {
                        "Raw": "AB in Engineering Science",
                        "Normalized": "bachelors"
                    },
                    "Type": "bachelors"
                },
                "Majors": [
                    "Electrical Engineering"
                ],
                "LastEducationDate": {
                    "Date": "2017-06-01",
                    "IsCurrentDate": false,
                    "FoundYear": true,
                    "FoundMonth": true,
                    "FoundDay": false
                },
                "EndDate": {
                    "Date": "2017-06-01",
                    "IsCurrentDate": false,
                    "FoundYear": true,
                    "FoundMonth": true,
                    "FoundDay": false
                }
            }
        ]
    },
    EmploymentHistory: {
        "ExperienceSummary": {
            "Description": "Will Bennett's skills align with Communication, Marketing and Public Relations Managers (Communication, Marketing and Public Relations). Will Bennett has 5 years of work experience, with 3 years of management experience, including a mid-level position.",
            "MonthsOfWorkExperience": 62,
            "MonthsOfManagementExperience": 39,
            "ExecutiveType": "GENERAL",
            "AverageMonthsPerEmployer": 62,
            "FulltimeDirectHirePredictiveIndex": 100,
            "ManagementStory": "Starting on 1/1/2022, the candidate held the following low-level management position for 14 months:\n\tTitle: Product Manager for Doximity\nStarting on 1/1/2018, the candidate held the following low-level management position for 2 years and 1 months:\n\tTitle: Associate Product Manager for Doximity",
            "CurrentManagementLevel": "low-level",
            "ManagementScore": 50
        },
        "Positions": [
            {
                "Id": "POS-1",
                "Employer": {
                    "Name": {
                        "Probability": "Confident",
                        "Raw": "Doximity",
                        "Normalized": "Doximity"
                    },
                    "Location": {
                        "CountryCode": "US",
                        "Regions": [
                            "CA"
                        ],
                        "Municipality": "San Francisco"
                    }
                },
                "RelatedToByCompanyName": [
                    "POS-2",
                    "POS-3"
                ],
                "IsSelfEmployed": false,
                "IsCurrent": false,
                "JobTitle": {
                    "Raw": "Product Manager",
                    "Normalized": "Product Manager",
                    "Probability": "Confident"
                },
                "StartDate": {
                    "Date": "2022-01-01",
                    "IsCurrentDate": false,
                    "FoundYear": true,
                    "FoundMonth": true,
                    "FoundDay": false
                },
                "EndDate": {
                    "Date": "2023-03-01",
                    "IsCurrentDate": false,
                    "FoundYear": true,
                    "FoundMonth": true,
                    "FoundDay": false
                },
                "JobType": "directHire",
                "JobLevel": "Manager",
                "TaxonomyPercentage": 0,
                "Description": "●   Collaborated cross-functionally with engineering, data, design, sales, & marketing teams to revamp ad targeting product\n●   Improved client ROIs by designing and implementing framework with data scientist to target users with ad inventory\n●   Launched a novel high-priority tool with data and engineering within 10 days, enabling $7M in sales in first 3 months",
            },
            {
                "Id": "POS-2",
                "Employer": {
                    "Name": {
                        "Probability": "Confident",
                        "Raw": "Doximity",
                        "Normalized": "Doximity"
                    },
                    "Location": {
                        "CountryCode": "US",
                        "Regions": [
                            "CA"
                        ],
                        "Municipality": "San Francisco"
                    }
                },
                "RelatedToByCompanyName": [
                    "POS-1",
                    "POS-3"
                ],
                "IsSelfEmployed": false,
                "IsCurrent": false,
                "JobTitle": {
                    "Raw": "Business Analyst",
                    "Normalized": "Business Analyst",
                    "Probability": "Confident"
                },
                "StartDate": {
                    "Date": "2020-02-01",
                    "IsCurrentDate": false,
                    "FoundYear": true,
                    "FoundMonth": true,
                    "FoundDay": false
                },
                "EndDate": {
                    "Date": "2022-01-01",
                    "IsCurrentDate": false,
                    "FoundYear": true,
                    "FoundMonth": true,
                    "FoundDay": false
                },
                "JobType": "directHire",
                "JobLevel": "Entry Level",
                "TaxonomyPercentage": 0,
                "Description": "●   Analyzed business impact with SQL and worked with pricing director to offer Telemedicine product ad-free during COVID-19\n●   Decreased ads missing goal from 5% to 1% by enhancing performance review process using google sheets and Looker\n●   Generated $60M+ in revenue working with pricing director and BizOps SVP on price changes by analyzing user activity in SQL",
            },
            {
                "Id": "POS-3",
                "Employer": {
                    "Name": {
                        "Probability": "Confident",
                        "Raw": "Doximity",
                        "Normalized": "Doximity"
                    },
                    "Location": {
                        "CountryCode": "US",
                        "Regions": [
                            "CA"
                        ],
                        "Municipality": "San Francisco"
                    }
                },
                "RelatedToByCompanyName": [
                    "POS-1",
                    "POS-2"
                ],
                "IsSelfEmployed": false,
                "IsCurrent": false,
                "JobTitle": {
                    "Raw": "Associate Product Manager",
                    "Normalized": "Associate Product Manager",
                    "Probability": "Confident"
                },
                "StartDate": {
                    "Date": "2018-01-01",
                    "IsCurrentDate": false,
                    "FoundYear": true,
                    "FoundMonth": true,
                    "FoundDay": false
                },
                "EndDate": {
                    "Date": "2020-02-01",
                    "IsCurrentDate": false,
                    "FoundYear": true,
                    "FoundMonth": true,
                    "FoundDay": false
                },
                "JobType": "directHire",
                "JobLevel": "Entry Level",
                "TaxonomyPercentage": 0,
                "Description": "●   Provided robust support for the rollout of a major user flow change impacting 300k monthly active users (MAU)\n●   Improved marketing email CTR by 3% with an AB test working with design team that is now current email gold standard",
            }
        ]
    },
    Skills: {
        "Raw": [
            {
                "Name": "BigQuery",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "SKILLS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "Bootcamp",
                "FoundIn": [
                    {
                        "SectionType": "EDUCATION",
                        "Id": "DEG-1"
                    }
                ],
                "MonthsExperience": {
                    "Value": 3
                },
                "LastUsed": {
                    "Value": "2023-07-01"
                }
            },
            {
                "Name": "business impact",
                "FoundIn": [
                    {
                        "SectionType": "WORK HISTORY",
                        "Id": "POS-2"
                    }
                ],
                "MonthsExperience": {
                    "Value": 23
                },
                "LastUsed": {
                    "Value": "2022-01-01"
                }
            },
            {
                "Name": "collaborative",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "COVID-19",
                "FoundIn": [
                    {
                        "SectionType": "WORK HISTORY",
                        "Id": "POS-2"
                    }
                ],
                "MonthsExperience": {
                    "Value": 23
                },
                "LastUsed": {
                    "Value": "2022-01-01"
                }
            },
            {
                "Name": "Data Science",
                "FoundIn": [
                    {
                        "SectionType": "EDUCATION",
                        "Id": "DEG-1"
                    }
                ],
                "MonthsExperience": {
                    "Value": 3
                },
                "LastUsed": {
                    "Value": "2023-07-01"
                }
            },
            {
                "Name": "database",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "decision tree",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "Decision Trees",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "Electrical Engineering",
                "FoundIn": [
                    {
                        "SectionType": "EDUCATION",
                        "Id": "DEG-2"
                    }
                ],
                "LastUsed": {
                    "Value": "2017-06-01"
                }
            },
            {
                "Name": "engineering",
                "FoundIn": [
                    {
                        "SectionType": "WORK HISTORY",
                        "Id": "POS-1"
                    }
                ],
                "MonthsExperience": {
                    "Value": 14
                },
                "LastUsed": {
                    "Value": "2023-03-01"
                }
            },
            {
                "Name": "Engineering Science",
                "FoundIn": [
                    {
                        "SectionType": "EDUCATION",
                        "Id": "DEG-2"
                    }
                ],
                "LastUsed": {
                    "Value": "2017-06-01"
                }
            },
            {
                "Name": "Excel",
                "FoundIn": [
                    {
                        "SectionType": "SKILLS"
                    }
                ]
            },
            {
                "Name": "Github",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "health records",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "inventory",
                "FoundIn": [
                    {
                        "SectionType": "WORK HISTORY",
                        "Id": "POS-1"
                    }
                ],
                "MonthsExperience": {
                    "Value": 14
                },
                "LastUsed": {
                    "Value": "2023-03-01"
                }
            },
            {
                "Name": "Keras",
                "FoundIn": [
                    {
                        "SectionType": "SKILLS"
                    }
                ]
            },
            {
                "Name": "Least Squares",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "lecture",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "linear regression",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "Liver",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "Logistic Regression",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "Looker",
                "FoundIn": [
                    {
                        "SectionType": "SKILLS"
                    },
                    {
                        "SectionType": "WORK HISTORY",
                        "Id": "POS-2"
                    }
                ],
                "MonthsExperience": {
                    "Value": 23
                },
                "LastUsed": {
                    "Value": "2022-01-01"
                }
            },
            {
                "Name": "machine learning",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "marketing",
                "FoundIn": [
                    {
                        "SectionType": "WORK HISTORY",
                        "Id": "POS-1"
                    },
                    {
                        "SectionType": "WORK HISTORY",
                        "Id": "POS-3"
                    }
                ],
                "MonthsExperience": {
                    "Value": 39
                },
                "LastUsed": {
                    "Value": "2023-03-01"
                }
            },
            {
                "Name": "Mixpanel",
                "FoundIn": [
                    {
                        "SectionType": "SKILLS"
                    }
                ]
            },
            {
                "Name": "Neural Networks",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "Object Oriented",
                "FoundIn": [
                    {
                        "SectionType": "SKILLS"
                    }
                ]
            },
            {
                "Name": "OOP",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "patient outcomes",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "predicting",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "Prediction",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "pricing",
                "FoundIn": [
                    {
                        "SectionType": "WORK HISTORY",
                        "Id": "POS-2"
                    }
                ],
                "MonthsExperience": {
                    "Value": 23
                },
                "LastUsed": {
                    "Value": "2022-01-01"
                }
            },
            {
                "Name": "Product Manager",
                "FoundIn": [
                    {
                        "SectionType": "WORK HISTORY",
                        "Id": "POS-1"
                    },
                    {
                        "SectionType": "WORK HISTORY",
                        "Id": "POS-3"
                    }
                ],
                "MonthsExperience": {
                    "Value": 39
                },
                "LastUsed": {
                    "Value": "2023-03-01"
                }
            },
            {
                "Name": "Programming",
                "FoundIn": [
                    {
                        "SectionType": "SKILLS"
                    }
                ]
            },
            {
                "Name": "python",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "SKILLS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "Recommendation System",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "recommendation systems",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "sales",
                "FoundIn": [
                    {
                        "SectionType": "WORK HISTORY",
                        "Id": "POS-1"
                    }
                ],
                "MonthsExperience": {
                    "Value": 14
                },
                "LastUsed": {
                    "Value": "2023-03-01"
                }
            },
            {
                "Name": "Snowflake",
                "FoundIn": [
                    {
                        "SectionType": "SKILLS"
                    }
                ]
            },
            {
                "Name": "Spark",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "SKILLS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "SQL",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "SKILLS"
                    },
                    {
                        "SectionType": "WORK HISTORY",
                        "Id": "POS-2"
                    }
                ],
                "MonthsExperience": {
                    "Value": 23
                },
                "LastUsed": {
                    "Value": "2022-01-01"
                }
            },
            {
                "Name": "statistic",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            },
            {
                "Name": "Tableau",
                "FoundIn": [
                    {
                        "SectionType": "SKILLS"
                    }
                ]
            },
            {
                "Name": "Telemedicine",
                "FoundIn": [
                    {
                        "SectionType": "WORK HISTORY",
                        "Id": "POS-2"
                    }
                ],
                "MonthsExperience": {
                    "Value": 23
                },
                "LastUsed": {
                    "Value": "2022-01-01"
                }
            },
            {
                "Name": "TensorFlow",
                "FoundIn": [
                    {
                        "SectionType": "SKILLS"
                    }
                ]
            },
            {
                "Name": "XGBoost",
                "FoundIn": [
                    {
                        "SectionType": "PROJECT_HEADERS"
                    },
                    {
                        "SectionType": "WORK HISTORY"
                    }
                ]
            }
        ]
    },
    Certifications: [
        {
            Name: "Certified Scrum Master",
            MatchedFromList: true,
            IsVariation: false
        },
        {
            Name: "AWS Certified Solutions Architect",
            MatchedFromList: true,
            IsVariation: false
        }
        // ... (Add more certifications if needed)
    ]
};

export const sampleResume = {
    _id: '1',
    name: "John Doe",
    title: "Senior Software Engineer",
    email: "johndoe@example.com",
    phone: "+1234567890",
    social_links: {
        LinkedIn: "https://www.linkedin.com/in/johndoe",
        GitHub: "https://github.com/johndoe"
    },
    location: "San Francisco, CA, USA",
    summary: "An accomplished software engineer with a robust 10-year career, I specialize in designing and developing scalable web applications. My journey in the tech industry began with a strong educational foundation in computer science, which laid the groundwork for my deep understanding of programming principles and software architecture. Over the years, I have honed my skills in a variety of programming languages and frameworks, always staying abreast of the latest technological advancements.",
    areas_of_expertise: ["Web Development", "Software Architecture", "Agile Methodologies"],
    skills: ["JavaScript", "React", "Node.js", "Next.js", 'css', 'html', "Mongo.db"],
    interests: ["Open Source Contribution", "Hiking", "Photography"],
    professional_experience: [
        {
            "_id": "exp124",
            "title": "Software Engineer",
            "company": "ACME Corp. Inc",
            "location": "San Francisco, CA",
            "start_date": "2012-05-01",
            "end_date": "2018-05-01",
            "show": true,
            "summary": "Involved in full-stack web application development with a focus on creating responsive and user-friendly interfaces.",
            "responsibilities": [
                {
                    "_id": "res126",
                    "content": "Developed and optimized front-end UI/UX for high-traffic e-commerce websites.",
                    "detail": "Used React.js and Redux for state management.",
                    "show": true,
                },
                {
                    "_id": "res127",
                    "content": "Collaborated in back-end development, focusing on API design and database management.",
                    "detail": "Worked with Node.js and MongoDB.",
                    "show": true,
                },
                {
                    "_id": "res128",
                    "content": "Contributed to the testing and maintenance of web applications.",
                    "detail": "Implemented automated testing with Jest and Selenium.",
                    "show": true,
                }
            ]
        },
        {
            "_id": "exp123",
            "title": "Senior Software Engineer",
            "company": "Tech Solutions Inc",
            "location": "San Francisco, CA",
            "start_date": "2018-05-01",
            "current": true,
            "show": true,
            "summary": "Lead a team of developers in architecting and building innovative web applications, focusing on efficiency and scalability.",
            "responsibilities": [
                {
                    "_id": "res123",
                    "content": "Architected and implemented a scalable microservices architecture for a new product line.",
                    "detail": "Utilized Docker and Kubernetes for deployment.",
                    "show": true,
                },
                {
                    "_id": "res124",
                    "content": "Led the migration of legacy systems to modern JavaScript frameworks.",
                    "detail": "Transitioned from AngularJS to React.",
                    "show": true,
                },
                {
                    "_id": "res125",
                    "content": "Implemented Continuous Integration/Continuous Deployment (CI/CD) pipelines.",
                    "detail": "Integrated Jenkins and Git workflows.",
                    "show": true,
                }
            ]
        }
    ],
    education: [
        {
            "_id": "edu123",
            "degree": "Master of Science in Computer Science",
            "institution": "University of Technology",
            "location": "New York, NY",
            "start_date": "2010-09-01",
            "end_date": "2012-06-30",
            "show": true,
            "gpa": {
                '_id': '1',
                "score": "3.47",
                "scoringSystem": "4.0"
            },
            "summary": "Focused on software engineering and machine learning, acquiring advanced skills in algorithm design and data analysis.",
            "details": [
                {
                    "_id": "edu-det123",
                    "content": "Completed thesis on 'Advanced Predictive Models in Machine Learning', exploring novel algorithms for web-based applications.",
                    "show": true
                },
                {
                    "_id": "edu-det124",
                    "content": "Participated in an AI research group, contributing to publications on neural networks and deep learning.",
                    "show": true
                },
                {
                    "_id": "edu-det125",
                    "content": "Achieved top 5% in class for software engineering project, developing a mock e-commerce site using agile methodologies.",
                    "show": true
                }
            ]
        },
        {
            "_id": "edu124",
            "degree": "Bachelor of Science in Computer Science",
            "institution": "University of Technology",
            "location": "New York, NY",
            "start_date": "2006-09-01",
            "end_date": "2010-06-30",
            "show": true,
            "summary": "Gained a foundational understanding of computer science principles, with a focus on software development and system design.",
            "details": [
                {
                    "_id": "edu-det126",
                    "content": "Led a capstone project on 'Database Management Systems', enhancing practical skills in data storage and retrieval.",
                    "show": true
                },
                {
                    "_id": "edu-det127",
                    "content": "Completed a summer internship at XYZ Tech, working on front-end development and user experience design.",
                    "show": true
                },
                {
                    "_id": "edu-det128",
                    "content": "Member of the Computer Science Club, organizing coding workshops and hackathons.",
                    "show": true
                }
            ]
        }
        // ... additional education
    ],
    projects: [
        {
            "_id": "proj123",
            "name": "Project Management Tool",
            "organization": "Tech Solutions Inc",
            "Link": "https://platform.openai.com/docs/quickstart?context=node",
            "LinkTitle": "Github",
            "location": "San Francisco, CA",
            "start_date": "2019-01-01",
            "end_date": "2020-01-01",
            "summary": "Involved in full-stack web application development with a focus on creating responsive and user-friendly interfaces.",
            "show": true,
            "details": [
                {
                    "_id": "proj-det121",
                    "content": "Architected the backend using Node.js and Express, focusing on API design and database integration.",
                    "show": true
                },
                {
                    "_id": "proj-det122",
                    "content": "Implemented responsive front-end interfaces using React and Redux, enhancing user experience and interactivity.",
                    "show": true
                },
                {
                    "_id": "proj-det123",
                    "content": "Integrated real-time collaboration features, leveraging WebSockets for seamless team interaction.",
                    "show": true
                }
            ]
        },
        {
            "_id": "proj124",
            "name": "E-commerce Analytics Dashboard",
            "organization": "Independent Project",
            "Link": "https://github.com/yourgithub/e-commerce-dashboard",
            "LinkTitle": "Github",
            "location": "Remote",
            "start_date": "2020-06-01",
            "end_date": "2021-03-01",
            "summary": "Involved in full-stack web application development with a focus on creating responsive and user-friendly interfaces.",
            "show": true,
            "details": [
                {
                    "_id": "proj-det124",
                    "content": "Designed and developed an analytics dashboard for e-commerce platforms, analyzing sales data to provide insights.",
                    "show": true
                },
                {
                    "_id": "proj-det125",
                    "content": "Employed D3.js and Chart.js for dynamic data visualization, offering interactive charts and graphs.",
                    "show": true
                },
                {
                    "_id": "proj-det126",
                    "content": "Implemented a custom authentication system and user management features, ensuring data security and privacy.",
                    "show": true
                }
            ]
        }
    ],
    publications: [
        {
            _id: "pub123",
            publication: "Efficient Algorithms in Distributed Systems",
            publisher: "Tech Journal",
            date: "2020-08-15",
            show: true
        },
        {
            _id: "pub124",
            publication: "publication 2",
            publisher: "Tech Journal",
            date: "2020-08-15",
            show: true
        },
        {
            _id: "pub125",
            publication: "publication 3",
            publisher: "Tech Journal",
            date: "2020-08-15",
            show: true
        }
        // ... additional publications
    ],
    certifications: [
        {
            _id: "cert123",
            certification: "Certified JavaScript Developer",
            provider: "Programming Institute",
            summary: "Involved in full-stack web application development with a focus on creating responsive and user-friendly interfaces.",
            start_date: "2019-05-01",
            end_date: "2024-05-01",
            show: true
        },
        {
            _id: "cert124",
            certification: "Cert 2",
            summary: "Involved in full-stack web application development with a focus on creating responsive and user-friendly interfaces.",
            provider: "Programming Institute",
            start_date: "2022-05-01",
            end_date: "2023-05-01",
            show: true
        }
    ],
    awards: [
        {
            _id: "award123",
            award: "Award 1",
            organization: "Global Tech Awards",
            date: "2021-11-10",
            show: true
        },
        {
            _id: "award124",
            award: "Best Innovator in Web Technologies",
            organization: "Global Tech Awards",
            date: "2023-11-10",
            show: true
        }
    ],
    userId: "user123",
    volunteering: [
        {
            _id: "volunteer1",
            involvement: "Volunteer Coordinator",
            organization: "Green Earth Advocates",
            location: "San Francisco, CA",
            start_date: "2019-04-01",
            end_date: "2020-12-01",
            show: true,
            summary: "Coordinated local volunteer efforts for environmental advocacy and awareness campaigns.",
            details: [
                {
                    _id: "detail1",
                    content: "Organized and led beach clean-up initiatives.",
                    detail: "Managed teams of 20+ volunteers.",
                    starStory: "Successfully organized 15 clean-up events in a year.",
                    show: true
                },
                {
                    _id: "detail2",
                    content: "Conducted educational workshops on waste management.",
                    detail: "Collaborated with local schools for awareness programs.",
                    show: true
                }
            ]
        },
        {
            _id: "volunteer2",
            involvement: "Animal Care Volunteer",
            organization: "Happy Paws Animal Shelter",
            location: "Austin, TX",
            start_date: "2021-01-01",
            end_date: "2023-01-01",
            show: true,
            summary: "Assisted in the care and rehabilitation of rescued animals.",
            details: [
                {
                    _id: "detail3",
                    content: "Provided daily care for shelter animals, including feeding and grooming.",
                    detail: "Special focus on dogs and cats.",
                    show: true
                },
                {
                    _id: "detail4",
                    content: "Helped with adoption events and awareness campaigns.",
                    detail: "Facilitated 30+ successful pet adoptions.",
                    show: true
                }
            ]
        }
    ]
};
