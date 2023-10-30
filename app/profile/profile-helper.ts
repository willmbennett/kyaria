
export type FormFields = {
  name: string;
  title: string;
  email: string;
  phone: string;
  social_links: { [key: string]: string };
  location: string;
  summary: string;
  areas_of_expertise: string[];
  skills: string[];
  professional_experience: {
    title: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string;
    responsibilities: {
      content: string;
      detail: string;
    }[];
  }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    start_date: string;
    end_date: string;
    details: {
      content: string;
      detail: string;
    }[];
  }[];
};

export const parsedResume = { "ContactInformation": { "CandidateName": { "FormattedName": "Will Bennett", "GivenName": "Will", "FamilyName": "Bennett" }, "Telephones": [{ "Raw": "207-239-0234", "Normalized": "+1 207-239-0234", "InternationalCountryCode": "1", "AreaCityCode": "207", "SubscriberNumber": "239-0234" }], "EmailAddresses": ["wbennett711@gmail.com"] }, "ProfessionalSummary": "Highly-driven Business Analyst with a solid\nfoundation in data science.\nUtilizing\ntechnical pro fi ciency in data analysis, machine learning, and statistical modeling\nto foster product excellence and\nachievement. Pro fi cient at deriving valuable\ninsights from data-driven approaches to\ninform decision-making across the entire\nproduct life cycle.\nDemonstrated success in\nspearheading the launch and management\nof data-driven products that align with\ncustomer demands and surpass\norganizational goals.\nEnthusiastic about\nharnessing data science to develop\nimpactful, user-centric products that\nstimulate growth and deliver exceptional\ncustomer value.", "Education": { "HighestDegree": { "Name": { "Raw": "AB in Engineering Science", "Normalized": "bachelors" }, "Type": "bachelors" }, "EducationDetails": [{ "Id": "DEG-1", "Text": "Data Science Immersive (Student)\n03/2023 to 07/2023\nFlatiron - (remote)\nApplied machine learning methodologies to end stage liver disease to improve\noutcome prediction (0.86 C-statistic vs. 0.78 gold standard MELD score)\nBuilt ALS Spark recommendation systems in python using the MovieLens dataset\n(0.87 RMSE vs Net fl ix competition winner 0.8567 RMSE)\nPredicted h1n1 vaccination status of 26k survey respondents using machine learning\nOnline Learning with Certi fi cates of Completion\n12/2019 to 03/2021\nUdemy - (online)\nBusiness Analysis, Advanced Web Development, Algorithms, Data Structures\nAB in Engineering Science, BE in Electrical Engineering", "SchoolName": { "Raw": "Udemy", "Normalized": "Udemy" }, "SchoolType": "university", "Degree": { "Name": { "Raw": "AB in Engineering Science", "Normalized": "bachelors" }, "Type": "bachelors" }, "Majors": ["Electrical Engineering"], "LastEducationDate": { "Date": "2023-07-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "StartDate": { "Date": "2023-03-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2023-07-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false } }, { "Id": "DEG-2", "Text": "08/2013 to 06/2017\nDartmouth College - Hanover, NH", "SchoolName": { "Raw": "Dartmouth College", "Normalized": "Dartmouth College" }, "SchoolType": "college", "Location": { "CountryCode": "US", "Regions": ["NH"], "Municipality": "Hanover" }, "LastEducationDate": { "Date": "2017-06-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "StartDate": { "Date": "2013-08-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2017-06-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false } }] }, "EmploymentHistory": { "ExperienceSummary": { "Description": "Will Bennett is experienced in the management of:  Information and Communication Technology; and Communication, Marketing and Public Relations (Communication, Marketing and Public Relations Managers). Will Bennett has 5 years of work experience, with 3 years of management experience, including a mid-level position.", "MonthsOfWorkExperience": 62, "MonthsOfManagementExperience": 39, "ExecutiveType": "GENERAL", "AverageMonthsPerEmployer": 62, "FulltimeDirectHirePredictiveIndex": 100, "ManagementStory": "Starting on 1/1/2022, the candidate held the following low-level management position for 14 months:\n\tTitle: Technical Product Manager for Doximity\nStarting on 1/1/2018, the candidate held the following low-level management position for 2 years and 1 months:\n\tTitle: Associate Product Manager for Doximity", "CurrentManagementLevel": "low-level", "ManagementScore": 50 }, "Positions": [{ "Id": "POS-1", "Employer": { "Name": { "Probability": "Confident", "Raw": "Doximity", "Normalized": "Doximity" }, "Location": { "CountryCode": "US", "Regions": ["CA"], "Municipality": "San Francisco" } }, "RelatedToByCompanyName": ["POS-2", "POS-3"], "IsSelfEmployed": false, "IsCurrent": false, "JobTitle": { "Raw": "Technical Product Manager", "Normalized": "Technical Product Manager", "Probability": "Confident" }, "StartDate": { "Date": "2022-01-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2023-03-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "JobType": "directHire", "JobLevel": "Manager", "TaxonomyPercentage": 0, "Description": "Collaborated cross-functionally with engineering, design, sales, and marketing teams to transform ad targeting product.\nLed design and implementation of an ad targeting framework, worked with a data\nscientist to improve client ROIs, presented results to CEO and company.\nSuccessfully launched a high-priority complex internal tool within 10 days, generating\nover $5M in sales within the fi rst 3 months." }, { "Id": "POS-2", "Employer": { "Name": { "Probability": "Confident", "Raw": "Doximity", "Normalized": "Doximity" }, "Location": { "CountryCode": "US", "Regions": ["CA"], "Municipality": "San Francisco" } }, "RelatedToByCompanyName": ["POS-1", "POS-3"], "IsSelfEmployed": false, "IsCurrent": false, "JobTitle": { "Raw": "Business Analyst", "Normalized": "Business Analyst", "Probability": "Confident" }, "StartDate": { "Date": "2020-02-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2022-01-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "JobType": "directHire", "JobLevel": "Entry Level", "TaxonomyPercentage": 0, "Description": "Utilized SQL for business impact analysis and worked with SVP of BizOps to o ff er\nad-free Telemedicine product during COVID-19.\nGenerated over $60M in revenue as a direct result of implementing a new pricing\nstrategy developed using SQL and Excel in collaboration with the pricing director.\nInitiated monthly ad inventory reviews, leading KPI dashboard creation for enhanced\ninter-team alignment on engagement strategies.\nOptimized ad performance reviews, elevating goal attainment from 95% to 99% by\nleveraging Excel and Looker analytics." }, { "Id": "POS-3", "Employer": { "Name": { "Probability": "Confident", "Raw": "Doximity", "Normalized": "Doximity" }, "Location": { "CountryCode": "US", "Regions": ["CA"], "Municipality": "San Francisco" } }, "RelatedToByCompanyName": ["POS-1", "POS-2"], "IsSelfEmployed": false, "IsCurrent": false, "JobTitle": { "Raw": "Associate Product Manager", "Normalized": "Associate Product Manager", "Probability": "Confident" }, "StartDate": { "Date": "2018-01-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "EndDate": { "Date": "2020-02-01", "IsCurrentDate": false, "FoundYear": true, "FoundMonth": true, "FoundDay": false }, "JobType": "directHire", "JobLevel": "Entry Level", "TaxonomyPercentage": 0, "Description": "Provided robust support for the rollout of a major user\nfl ow change impacting 300k\nmonthly active users (MAU)\nImproved marketing email CTR by 3% with an AB test working with design team that\nis now current email gold standard\nWorked with data scientists to build dimensional models, built BI dashboard for goals and KPI monitoring, planned and executed switch to Looker" }] }, "Skills": { "Raw": [{ "Name": "Agile Development", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Algorithms", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "BigQuery", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Business Analysis", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "business impact analysis", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "Collaboration", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "COVID-19.", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "CSS", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "dashboard", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }, { "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 48 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "data analysis", "FoundIn": [{ "SectionType": "SUMMARY" }] }, { "Name": "Data Science", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "SUMMARY" }, { "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "Data Structures", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "Data Visualization", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Decision-Making", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "SUMMARY" }] }, { "Name": "Electrical Engineering", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "engineering", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-1" }], "MonthsExperience": { "Value": 14 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Engineering Science", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "Enthusiastic", "FoundIn": [{ "SectionType": "SUMMARY" }] }, { "Name": "Excel", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "HTML", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "inventory", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "JavaScript", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Jira", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Keras", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "KPI monitoring", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 25 }, "LastUsed": { "Value": "2020-02-01" } }, { "Name": "liver", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "Looker", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 25 }, "LastUsed": { "Value": "2020-02-01" } }, { "Name": "Looker analytics", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "Machine Learning", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "SUMMARY" }, { "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "Market Analysis", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "marketing", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-1" }, { "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 39 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Mixpanel", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Node.js", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Object Oriented", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "organizational goals.", "FoundIn": [{ "SectionType": "SUMMARY" }] }, { "Name": "performance reviews", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "Predicted", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "prediction", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "pricing", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "product life cycle.", "FoundIn": [{ "SectionType": "SUMMARY" }] }, { "Name": "Product Management", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Product Manager", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-1" }, { "SectionType": "WORK HISTORY", "Id": "POS-3" }], "MonthsExperience": { "Value": 39 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Programming", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Project Management", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Python", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "React.js", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "recommendation systems", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "sales", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-1" }], "MonthsExperience": { "Value": 14 }, "LastUsed": { "Value": "2023-03-01" } }, { "Name": "Salesforce", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Scrum", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Spark", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "SQL", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "SQL Query", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "statistic", "FoundIn": [{ "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "statistical modeling", "FoundIn": [{ "SectionType": "SUMMARY" }] }, { "Name": "strategies.", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "Tableau", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Telemedicine", "FoundIn": [{ "SectionType": "WORK HISTORY", "Id": "POS-2" }], "MonthsExperience": { "Value": 23 }, "LastUsed": { "Value": "2022-01-01" } }, { "Name": "TensorFlow", "FoundIn": [{ "SectionType": "SKILLS" }] }, { "Name": "Web Development", "FoundIn": [{ "SectionType": "SKILLS" }, { "SectionType": "EDUCATION", "Id": "DEG-1" }], "MonthsExperience": { "Value": 4 }, "LastUsed": { "Value": "2023-07-01" } }, { "Name": "Wireframing", "FoundIn": [{ "SectionType": "SKILLS" }] }] }, "LanguageCompetencies": [{ "Language": "English", "LanguageCode": "en", "FoundInContext": "[RESUME_LANGUAGE]" }], "QualificationsSummary": "Areas of Expertise\nCross-Functional Collaboration\nData-Driven Decision-Making\nProduct Management\nBusiness Analysis\nData Visualization\nSQL Query Writing\nMachine Learning and Data Science\nProject Management\nMarket Analysis\nSkills\nProduct Management\nJira, Roadmapping, Agile Development, Wireframing, Scrum, Salesforce\nData Science\nSQL, Looker, Colab, Mixpanel, Tableau, Snow fl ake, BigQuery, Excel, Python, TensorFlow, Keras, Object Oriented\nProgramming, scikit-learn, Spark, pandas, numpy\nWeb Development\nReact.js, Node.js, JavaScript, HTML, CSS, Markup", "ResumeMetadata": { "FoundSections": [{ "FirstLineNumber": 7, "LastLineNumber": 26, "SectionType": "SUMMARY", "HeaderTextFound": "Pro fi le" }, { "FirstLineNumber": 27, "LastLineNumber": 44, "SectionType": "SKILLS", "HeaderTextFound": "Areas of Expertise" }, { "FirstLineNumber": 45, "LastLineNumber": 76, "SectionType": "WORK HISTORY", "HeaderTextFound": "Professional Experience" }, { "FirstLineNumber": 77, "LastLineNumber": 92, "SectionType": "EDUCATION", "HeaderTextFound": "Education" }], "ResumeQuality": [{ "Level": "Data Missing", "Findings": [{ "QualityCode": "213", "Message": "A street level address was not found in the contact information. A full contact address should always be included in a resume as it allows for location based searches." }, { "QualityCode": "231", "SectionIdentifiers": [{ "SectionType": "DEG-2" }], "Message": "Every degree in a resume should have a name or type associated with it, such as 'B.S.' or 'M.S.'." }] }, { "Level": "Suggested Improvements", "Findings": [{ "QualityCode": "161", "Message": "High school (or lower) education should not be included on resumes that contain higher-level education." }, { "QualityCode": "112", "Message": "The following section was identified as a skills section type: 'Areas of Expertise'. Skills should not be in a separate section, but instead, each skill should be included in the descriptions of work history or education. THIS IS INCREDIBLY IMPORTANT FOR AI MATCHING ALGORITHMS" }] }], "ReservedData": { "Phones": ["207-239-0234"], "Names": ["Will Bennett"], "EmailAddresses": ["wbennett711@gmail.com"] }, "PlainText": "Will Bennett\nBusiness Analyst Pro fi le\nwbennett711@gmail.com\n207-239-0234\nGithub\nLinkedIn\nCupertino, CA\nPro fi le\nHighly-driven Business Analyst with a solid\nfoundation in data science.\nUtilizing\ntechnical pro fi ciency in data analysis, machine learning, and statistical modeling\nto foster product excellence and\nachievement. Pro fi cient at deriving valuable\ninsights from data-driven approaches to\ninform decision-making across the entire\nproduct life cycle.\nDemonstrated success in\nspearheading the launch and management\nof data-driven products that align with\ncustomer demands and surpass\norganizational goals.\nEnthusiastic about\nharnessing data science to develop\nimpactful, user-centric products that\nstimulate growth and deliver exceptional\ncustomer value.\nAreas of Expertise\n●\nCross-Functional Collaboration\n●\nData-Driven Decision-Making\n●\nProduct Management\n●\nBusiness Analysis\n●\nData Visualization\n●\nSQL Query Writing\n●\nMachine Learning and Data Science\n●\nProject Management\n●\nMarket Analysis\nSkills\nProduct Management\nJira, Roadmapping, Agile Development, Wireframing, Scrum, Salesforce\nData Science\nSQL, Looker, Colab, Mixpanel, Tableau, Snow fl ake, BigQuery, Excel, Python, TensorFlow, Keras, Object Oriented\nProgramming, scikit-learn, Spark, pandas, numpy\nWeb Development\nReact.js, Node.js, JavaScript, HTML, CSS, Markup\nProfessional Experience\nTechnical Product Manager\n01/2022 to 03/2023\nDoximity - San Francisco, CA\n●\nCollaborated cross-functionally with engineering, design, sales, and marketing teams\nto transform ad targeting product.\n●\nLed design and implementation of an ad targeting framework, worked with a data\nscientist to improve client ROIs, presented results to CEO and company.\n●\nSuccessfully launched a high-priority complex internal tool within 10 days, generating\nover $5M in sales within the\nfi rst 3 months.\nBusiness Analyst\n02/2020 to 01/2022\nDoximity - San Francisco, CA\n●\nUtilized SQL for business impact analysis and worked with SVP of BizOps to o ff er\nad-free Telemedicine product during COVID-19.\n●\nGenerated over $60M in revenue as a direct result of implementing a new pricing\nstrategy developed using SQL and Excel in collaboration with the pricing director.\n●\nInitiated monthly ad inventory reviews, leading KPI dashboard creation for enhanced\ninter-team alignment on engagement strategies.\n●\nOptimized ad performance reviews, elevating goal attainment from 95% to 99% by\nleveraging Excel and Looker analytics.\nAssociate Product Manager\n01/2018 to 02/2020\nDoximity - San Francisco, CA\n●\nProvided robust support for the rollout of a major user\nfl ow change impacting 300k\nmonthly active users (MAU)\n●\nImproved marketing email CTR by 3% with an AB test working with design team that\nis now current email gold standard\n●\nWorked with data scientists to build dimensional models, built BI dashboard for goals\nand KPI monitoring, planned and executed switch to Looker\nEducation\nData Science Immersive (Student)\n03/2023 to 07/2023\nFlatiron - (remote)\n●\nApplied machine learning methodologies to end stage liver disease to improve\noutcome prediction (0.86 C-statistic vs. 0.78 gold standard MELD score)\n●\nBuilt ALS Spark recommendation systems in python using the MovieLens dataset\n(0.87 RMSE vs Net fl ix competition winner 0.8567 RMSE)\n●\nPredicted h1n1 vaccination status of 26k survey respondents using machine learning\nOnline Learning with Certi fi cates of Completion\n12/2019 to 03/2021\nUdemy - (online)\n●\nBusiness Analysis, Advanced Web Development, Algorithms, Data Structures\nAB in Engineering Science, BE in Electrical Engineering\n08/2013 to 06/2017\nDartmouth College - Hanover, NH", "DocumentLanguage": "en", "DocumentCulture": "en-US", "ParserSettings": "Coverage.PersonalAttributes = True; Coverage.Training = True; Culture.CountryCodeForUnitedKingdomIsUK = True; Culture.DefaultCountryCode = US; Culture.Language = English; Culture.PreferEnglishVersionIfTwoLanguagesInDocument = False; Data.UserDefinedParsing = False; Data.UseV2SkillsTaxonomy = True; OutputFormat.AssumeCompanyNameFromPrecedingJob = False; OutputFormat.ContactMethod.PackStyle = Split; OutputFormat.DateOutputStyle = ExplicitlyKnownDateInfoOnly; OutputFormat.NestJobsBasedOnDateRanges = True; OutputFormat.NormalizeRegions = False; OutputFormat.SimpleCustomLinkedIn = False; OutputFormat.SkillsStyle = Default; OutputFormat.StripParsedDataFromPositionHistoryDescription = True; OutputFormat.TelcomNumber.Style = Raw; OutputFormat.XmlFormat = HrXmlResume25", "DocumentLastModified": "2023-10-15" } }

export const roleOptions = [
  'Software Developer',
  'Senior Software Developer',
  'Manager',
  'Analyst',
  'System Administrator',
  'Data Scientist',
  'Network Engineer',
  'Front-End Developer',
  'Back-End Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Product Manager',
  'Graphic Designer',
  'UX/UI Designer',
  'Database Administrator',
  'Cloud Engineer',
  'Mobile App Developer',
  'QA Engineer',
  'Sales Representative',
  'Marketing Specialist',
  'Technical Writer',
  'HR Specialist',
  'Project Manager',
  'Security Analyst',
  'Business Analyst',
  'Financial Analyst',
  'Financial Advisor',
  'Auditor',
  'Consultant',
  'Customer Support Specialist',
  'Research Scientist',
  'Other'
];




export const expectedJson = {
  "name": "",
  "title": "",
  "email": "",
  "phone": "",
  "social_links": { "": "" },
  "location": "",
  "summary": "",
  "areas_of_expertise": [""],
  "skills": [""],
  "professional_experience": [
    {
      "title": "",
      "company": "",
      "location": "",
      "start_date": "",
      "end_date": "",
      "responsibilities": [{ "content": "" }]
    }
  ],
  "education": [
    {
      "degree": "",
      "institution": "",
      "location": "",
      "start_date": "",
      "end_date": "",
      "details": [{ "content": "" }]
    }
  ]
}

export const defaultTextInput =
  `Will Bennett
Product Manager Profile




wbennett711@gmail.com • 207-239-0234
Github • LinkedIn • Cupertino, CA
Profile
Adaptable and growth-oriented Product Manager specializing in B2B SaaS and Technical Product Management. With a strong grasp of web development fundamentals, I effortlessly converse with engineers and excel at diving into technical issues. Known for creative problem-solving and a track record of driving sustainable growth at Doximity, Will I thrive in dynamic, small-team environments. Committed to rolling up my sleeves and overcoming roadblocks, I'm passionate about building structured systems and processes for long-term success.
Areas of Expertise
Technical Product Management
B2B SaaS Expertise
Project Scope Planning
Engineering Coordination
Customer-Driven Roadmapping
Web Development Fundamentals
SalesForce Platform Integration
Technical Problem-Solving
Startup Growth Strategies
Process and System Building
Agile Project Management
Skills
Product Management
Jira, Roadmapping, Agile Development, Wireframing, Scrum, Salesforce.

Data Science
SQL, Looker, Colab, Mixpanel, Tableau, Snowflake, BigQuery, Excel, Python, TensorFlow, Keras, Object Oriented Programming, scikit-learn, Spark, pandas, numpy.

Web Development
React.js, Node.js, JavaScript, HTML, CSS, Markup.




Professional Experience
Technical Product Manager, B2B SaaS	01/2022 to 03/2023
Doximity - San Francisco, CA
Collaborated cross-functionally with engineering, data, design, sales, and marketing teams to revamp B2B SaaS ad targeting product for pharma clients.
Launched a novel high-priority tool for sales team with data and engineering within 10 days, enabling over $5M in sales in first 3 months.
Reduced Salesforce pricing errors by $200K by working with engineers to fix issues with auto-generated pricing.
Improved client ROIs by designing and implementing framework with data scientist  to target users with ad inventory.
Business Analyst	02/2020 to 01/2022
Doximity - San Francisco, CA
Analyzed business impact with SQL and worked with pricing director to offer Telemedicine product ad-free during COVID-19.
Optimized ad performance reviews, elevating goal attainment from 95% to 99% by leveraging Salesforce, Excel, and Looker analytics.
Generated $60M+ in revenue working with pricing director and BizOps SVP on price changes by analyzing user activity in SQL.
Associate Product Manager	01/2018 to 02/2020
Doximity - San Francisco, CA
Provided robust support for the rollout of a major user flow change impacting 300k monthly active users (MAU).
Improved marketing email CTR by 3% with an AB test working with design team that is now  current email gold standard.
Worked with data scientists to build dimensional models, built BI dashboard for goals and KPI monitoring, planned and executed switch to Looker.
Education
Data Science Immersive (Student)	03/2023 to 07/2023
Flatiron - Remote
Applied machine learning methodologies to end stage liver disease to improve outcome prediction (0.86 C-statistic vs. 0.78 gold standard MELD score).
Built ALS Spark recommendation systems in python using the MovieLens dataset (0.87 RMSE vs Netflix competition winner 0.8567 RMSE).
Predicted h1n1 vaccination status of 26k survey respondents using machine learning.
Online Learning with Certificates of Completion	12/2019 to 03/2021
Udemy - Online
Business Analysis, Advanced Web Development, Algorithms, Data Structures
AB in Engineering Science, BE in Electrical Engineering	08/2013 to 06/2017
Dartmouth College - Hanover, NH

`
export const demoJSON = {
  "name": "Will Bennett",
  "title": "Product Manager",
  "email": "wbennett71sdf1@gmail.com",
  "phone": "207-239-0234",
  "social_links": {
    "Github": "https://github.com/willmbennett",
    "LinkedIn": "https://linkedin.com/in/willmbennett/"
  },
  "location": "Cupertino, CA",
  "summary": "Adaptable and growth-oriented Product Manager specializing in B2B SaaS and Technical Product Management. With a strong grasp of web development fundamentals, I effortlessly converse with engineers and excel at diving into technical issues. Known for creative problem-solving and a track record of driving sustainable growth at Doximity, Will I thrive in dynamic, small-team environments. Committed to rolling up my sleeves and overcoming roadblocks, I'm passionate about building structured systems and processes for long-term success.",
  "areas_of_expertise": [
    "Technical Product Management",
    "B2B SaaS Expertise",
    "Project Scope Planning",
    "Engineering Coordination",
    "Customer-Driven Roadmapping",
    "Web Development Fundamentals",
    "SalesForce Platform Integration",
    "Technical Problem-Solving",
    "Startup Growth Strategies",
    "Process and System Building",
    "Agile Project Management"
  ],
  "skills": [
    "Product Management",
    "Jira, Roadmapping", "Agile Development", "Wireframing", "Scrum", "Salesforce",
    "Data Science",
    "SQL", "Looker", "Colab", "Mixpanel", "Tableau", "Snowflake", "BigQuery", "Excel", "Python", "TensorFlow", "Keras", "Object Oriented Programming", "scikit-learn", "Spark", "pandas", "numpy",
    "Web Development",
    "React.js", "Node.js", "JavaScript", "HTML", "CSS", "Markup"
  ],
  "professional_experience": [
    {
      "title": "Technical Product Manager, B2B SaaS",
      "company": "Doximity",
      "location": "San Francisco, CA",
      "start_date": "01/2022",
      "end_date": "03/2023",
      "responsibilities": [{
        "content": "Collaborated cross-functionally with engineering, data, design, sales, and marketing teams to revamp B2B SaaS ad targeting product for pharma clients",
        "starStory": ""
      },
      {
        "content": "Launched a novel high-priority tool for sales team with data and engineering within 10 days, enabling over $5M in sales in first 3 months",
        "starStory": ""
      },
      {
        "content": "Reduced Salesforce pricing errors by $200K by working with engineers to fix issues with auto-generated pricing",
        "starStory": ""
      },
      {
        "content": "Improved client ROIs by designing and implementing framework with data scientist  to target users with ad inventory",
        "starStory": ""
      }
      ]
    },
    {
      "title": "Business Analyst",
      "company": "Doximity",
      "location": "San Francisco, CA",
      "start_date": "02/2020",
      "end_date": "01/2022",
      "responsibilities": [{
        "content": "Analyzed business impact with SQL and worked with pricing director to offer Telemedicine product ad-free during COVID-19",
        "starStory": ""
      }, {
        "content": "Optimized ad performance reviews, elevating goal attainment from 95% to 99% by leveraging Salesforce, Excel, and Looker analytics",
        "starStory": ""
      }, {
        "content": "Generated $60M+ in revenue working with pricing director and BizOps SVP on price changes by analyzing user activity in SQL",
        "starStory": ""
      }
      ]
    },
    {
      "title": "Associate Product Manager",
      "company": "Doximity",
      "location": "San Francisco, CA",
      "start_date": "01/2018",
      "end_date": "02/2020",
      "responsibilities": [{
        "content": "Provided robust support for the rollout of a major user flow change impacting 300k monthly active users (MAU)",
        "starStory": ""
      }, {
        "content": "Improved marketing email CTR by 3% with an AB test working with design team that is now  current email gold standard",
        "starStory": ""
      }, {
        "content": "Worked with data scientists to build dimensional models, built BI dashboard for goals and KPI monitoring, planned and executed switch to Looker",
        "starStory": ""
      }
      ]
    }
  ],
  "education": [
    {
      "degree": "Data Science Immersive",
      "institution": "Flatiron",
      "location": "Remote",
      "details": [{
        "content": "Applied machine learning methodologies to end stage liver disease to improve outcome prediction (0.86 C-statistic vs. 0.78 gold standard MELD score)",
        "starStory": ""
      }, {
        "content": "Built ALS Spark recommendation systems in python using the MovieLens dataset (0.87 RMSE vs Netflix competition winner 0.8567 RMSE)",
        "starStory": ""
      }, {
        "content": "Predicted h1n1 vaccination status of 26k survey respondents using machine learning",
        "starStory": ""
      }
      ]
    },
    {
      "degree": "Online Learning with Certificates of Completion",
      "institution": "Udemy",
      "location": "Online",
      "details": [{
        "content": "Predicted h1n1 vaccination status of 26k survey respondents using machine learning",
        "starStory": "Business Analysis, Advanced Web Development, Algorithms, Data Structures"
      }
      ]
    },
    {
      "degree": "AB in Engineering Science, BE in Electrical Engineering",
      "institution": "Dartmouth College",
      "location": "Hanover, NH",
      "details": [{
        "content": "N/A",
        "starStory": ""
      }
      ]
    }
  ]
}

export function transformParsedResume(sourceData: any) {
  const transformedData = {
    name: '',
    title: '',
    email: '',
    phone: '',
    social_links: {},
    location: '',
    summary: '',
    education: [],
    professional_experience: [],
    skills: []
  };

  // Transform contact data
  if (sourceData.ContactInformation) {
    transformedData.name = sourceData.ContactInformation.CandidateName ? sourceData.ContactInformation.CandidateName.FormattedName : '';
    transformedData.email = sourceData.ContactInformation.EmailAddresses && sourceData.ContactInformation.EmailAddresses.length > 0 ? sourceData.ContactInformation.EmailAddresses[0] : '';
    transformedData.phone = sourceData.ContactInformation.Telephones && sourceData.ContactInformation.Telephones.length > 0 ? sourceData.ContactInformation.Telephones[0].Normalized : '';
    // NOTE: The sample data does not provide specific social links, title, or location.
    // These fields have been initialized, but not populated.
  }

  // Transform professional summary
  transformedData.summary = sourceData.ProfessionalSummary || '';

  // Transform education data
  if (sourceData.Education && sourceData.Education.EducationDetails) {
    transformedData.education = sourceData.Education.EducationDetails.map((detail: any) => ({
      degree: detail.Degree ? detail.Degree.Name.Raw : '',
      institution: detail.SchoolName ? detail.SchoolName.Raw : '',
      location: detail.Location ? (detail.Location.Municipality || detail.Location.CountryCode) : '',
      start_date: detail.StartDate ? detail.StartDate.Date : '',
      end_date: detail.EndDate ? detail.EndDate.Date : '',
      details: detail.Text ? detail.Text.split('\n').map((text: any) => ({
        content: text.trim(),
        detail: '' // This isn't clear from the source structure, so leaving empty for now.
      })) : [],
    }));
  }

  // Transform employment data
  if (sourceData.EmploymentHistory && sourceData.EmploymentHistory.Positions) {
    transformedData.professional_experience = sourceData.EmploymentHistory.Positions.map((position: any) => ({
      title: position.JobTitle ? position.JobTitle.Raw : '',
      company: position.Employer && position.Employer.Name ? position.Employer.Name.Raw : '',
      location: position.Employer && position.Employer.Location ? (position.Employer.Location.Municipality || position.Employer.Location.CountryCode) : '',
      start_date: position.StartDate ? position.StartDate.Date : '',
      end_date: position.EndDate ? position.EndDate.Date : '',
      responsibilities: position.Description ? position.Description.split('\n').map((text: any) => ({
        content: text.trim(),
        detail: '' // This isn't clear from the source structure, so leaving empty for now.
      })) : [],
    }));
  }

  // Transform skills data
  if (sourceData.Skills && sourceData.Skills.Raw) {
    transformedData.skills = sourceData.Skills.Raw.map((skill: any) => skill.Name);
  }

  return transformedData;
}

