import {
    ModelOptions,
    getModelForClass,
    prop,
    Severity,
    mongoose,
} from "@typegoose/typegoose";

class Name {
    @prop()
    public Raw?: string;

    @prop()
    public Normalized?: string;
}

class GeoCoordinates {
    @prop({ required: true })
    public Latitude!: number;

    @prop({ required: true })
    public Longitude!: number;

    @prop({ required: true })
    public Source!: string;
}

class Location {
    @prop({ required: true })
    public CountryCode!: string;

    @prop()
    public PostalCode?: string;

    @prop({ type: () => [String] })
    public Regions!: string[];

    @prop()
    public Municipality?: string;

    @prop({ type: () => [String] })
    public StreetAddressLines?: string[];

    @prop({ _id: false })
    public GeoCoordinates?: GeoCoordinates;
}

class Telephone {
    @prop({ required: true })
    public Raw!: string;

    @prop({ required: true })
    public Normalized!: string;

    @prop({ required: true })
    public InternationalCountryCode!: string;

    @prop({ required: true })
    public AreaCityCode!: string;

    @prop({ required: true })
    public SubscriberNumber!: string;
}

class WebAddress {
    @prop({ required: true })
    public Address!: string;

    @prop({ required: true })
    public Type!: string;
}

class CandidateName {
    @prop({ required: true })
    public FormattedName!: string;

    @prop()
    public Prefix?: string;

    @prop({ required: true })
    public GivenName!: string;

    @prop()
    public Moniker?: string;

    @prop()
    public MiddleName?: string;

    @prop({ required: true })
    public FamilyName!: string;

    @prop()
    public Suffix?: string;
}

class ContactInformation {
    @prop({ _id: false })
    public CandidateName?: CandidateName;

    @prop({ type: () => [Telephone], _id: false, default: [] })
    public Telephones?: Telephone[];

    @prop({ type: () => [String] })
    public EmailAddresses?: string[];

    @prop({ _id: false })
    public Location?: Location;

    @prop({ type: () => [WebAddress], _id: false, default: [] })
    public WebAddresses?: WebAddress[];
}

class SectionIdentifier {
    @prop({ required: true })
    public SectionType!: string;

    @prop()
    public Id?: string;
}

class Finding {
    @prop({ required: true })
    public QualityCode!: string;

    @prop({ type: () => [SectionIdentifier], _id: false, default: [] })
    public SectionIdentifiers?: SectionIdentifier[];

    @prop({ required: true })
    public Message!: string;
}

class ResumeQuality {
    @prop({ required: true })
    public Level!: string;

    @prop({ type: () => [Finding], _id: false, default: [] })
    public Findings!: Finding[];
}

class ResumeMetadata {
    @prop({ type: () => [ResumeQuality], _id: false, default: [] })
    public ResumeQuality!: ResumeQuality[];
}

// Education Section
class DateDetails {
    @prop()
    public Date?: string;

    @prop()
    public IsCurrentDate?: boolean;

    @prop()
    public FoundYear?: boolean;

    @prop()
    public FoundMonth?: boolean;

    @prop()
    public FoundDay?: boolean;

    @prop()
    public HasValue?: boolean;
}

class GPA {
    @prop()
    public Score?: string;

    @prop()
    public ScoringSystem?: string;

    @prop()
    public MaxScore?: string;

    @prop()
    public MinimumScore?: string;

    @prop()
    public NormalizedScore?: number;
}

class Degree {
    @prop({ _id: false })
    public Name!: Name;

    @prop()
    public Type?: string;
}

class EducationDetail {
    @prop()
    public Id?: string;

    @prop()
    public Text?: string;

    @prop({ _id: false })
    public SchoolName?: Name;

    @prop()
    public SchoolType?: string;

    @prop({ _id: false })
    public Location?: Location;

    @prop({ _id: false })
    public Degree?: Degree;

    @prop({ type: () => [String] })
    public Majors?: string[];

    @prop({ type: () => [String] })
    public Minors?: string[];

    @prop({ _id: false })
    public GPA?: GPA;

    @prop({ _id: false })
    public LastEducationDate?: DateDetails;

    @prop({ _id: false })
    public StartDate?: DateDetails;

    @prop({ _id: false })
    public EndDate?: DateDetails;

    @prop({ _id: false })
    public Graduated?: {
        Value?: boolean;
    };
}

class HighestDegree {
    @prop({ _id: false })
    public Name!: Name;

    @prop()
    public Type?: string;
}

class Education {
    @prop({ _id: false })
    public HighestDegree?: HighestDegree;

    @prop({ type: () => [EducationDetail], _id: false, default: [] })
    public EducationDetails?: EducationDetail[];
}

// Employment section
class EmpName {
    @prop()
    public Probability?: string;

    @prop({ required: true })
    public Raw!: string;

    @prop()
    public Normalized?: string;
}

class EmployerLocation {
    @prop({ required: true })
    public CountryCode!: string;

    @prop()
    public PostalCode?: string;

    @prop({ type: () => [String] })
    public Regions?: string[];

    @prop()
    public Municipality?: string;

    @prop({ type: () => [String] })
    public StreetAddressLines?: string[];

    @prop({ _id: false })
    public GeoCoordinates?: GeoCoordinates;
}

class Employer {
    @prop({ _id: false })
    public Name?: EmpName;

    @prop({ _id: false })
    public OtherFoundName?: Name;

    @prop({ _id: false })
    public Location?: EmployerLocation;
}

class Bullet {
    @prop({ required: true })
    public Type!: string;

    @prop({ required: true })
    public Text!: string;
}

class Position {
    @prop({ required: true })
    public Id!: string;

    @prop({ _id: false, required: true })
    public Employer!: Employer;

    @prop({ type: () => [String] })
    public RelatedToByDates?: string[];

    @prop({ type: () => [String] })
    public RelatedToByCompanyName?: string[];

    @prop()
    public IsSelfEmployed?: boolean;

    @prop()
    public IsCurrent?: boolean;

    @prop({ _id: false })
    public JobTitle?: EmpName;

    @prop({ _id: false })
    public StartDate?: DateDetails;

    @prop({ _id: false })
    public EndDate?: DateDetails;

    @prop({ _id: false })
    public NumberEmployeesSupervised?: {
        Value: number;
    };

    @prop()
    public JobType?: string;

    @prop()
    public TaxonomyName?: string;

    @prop()
    public SubTaxonomyName?: string;

    @prop()
    public JobLevel?: string;

    @prop()
    public TaxonomyPercentage?: number;

    @prop()
    public Description?: string;

    @prop({ type: () => [Bullet], _id: false, default: [] })
    public Bullets?: Bullet[];
}

class ExperienceSummary {
    @prop({ required: true })
    public Description!: string;

    @prop({ required: true })
    public MonthsOfWorkExperience!: number;

    @prop({ required: true })
    public MonthsOfManagementExperience!: number;

    @prop({ required: true })
    public ExecutiveType!: string;

    @prop({ required: true })
    public AverageMonthsPerEmployer!: number;

    @prop({ required: true })
    public FulltimeDirectHirePredictiveIndex!: number;

    @prop({ required: true })
    public ManagementStory!: string;

    @prop({ required: true })
    public CurrentManagementLevel!: string;

    @prop({ required: true })
    public ManagementScore!: number;

    @prop()
    public AttentionNeeded?: string;
}

class EmploymentHistory {
    @prop({ _id: false, required: true })
    public ExperienceSummary!: ExperienceSummary;

    @prop()
    public Positions!: Position[];
}

// Skills & MISC
class FoundIn {
    @prop({ required: true })
    public SectionType!: string;

    @prop()
    public Id?: string;
}

class Skill {
    @prop({ required: true })
    public Name!: string;

    @prop()
    public FoundIn!: FoundIn[];

    @prop({ _id: false })
    public MonthsExperience?: {
        Value: number;
    };

    @prop({ _id: false })
    public LastUsed?: {
        Value: string;
    };
}

class SkillsData {
    @prop({ items: Skill, default: [] })
    public Raw!: Skill[];
}

class Certification {
    @prop({ required: true })
    public Name!: string;

    @prop()
    public MatchedFromList?: boolean;

    @prop()
    public IsVariation?: boolean;

    // You can add methods or virtuals here if needed
}

class License {
    @prop({ required: true })
    public Name!: string;

    @prop()
    public MatchedFromList?: boolean;

    // You can add methods or virtuals here if needed
}

// After defining all classes, you can create the main ResumeData class
@ModelOptions({
    schemaOptions: {
        timestamps: true,
        versionKey: false,
        collection: "resumeScans",
    },
    options: {
        disableLowerIndexes: true,
        allowMixed: Severity.ALLOW
    }
})
class ResumeScanDataClass {
    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;

    @prop({required: true})
    public userId!: string;

    @prop()
    public ProfessionalSummary?: string;

    @prop()
    public Objective?: string;

    @prop()
    public CoverLetter?: string;

    @prop()
    public Hobbies?: string;

    @prop()
    public Patents?: string;

    @prop()
    public Publications?: string;

    @prop()
    public SpeakingEngagements?: string;

    @prop({ type: () => [ContactInformation] })
    public ContactInformation!: ContactInformation;

    @prop({ type: () => [ResumeMetadata] })
    public ResumeMetadata!: ResumeMetadata;

    @prop({ type: () => [Education] })
    public Education?: Education;

    @prop({ type: () => [EmploymentHistory] })
    public EmploymentHistory?: EmploymentHistory;

    @prop({ type: () => [SkillsData] })
    public Skills?: SkillsData;

    @prop({ type: () => [Certification] })
    public Certifications?: Certification[];

    @prop({ type: () => [License] })
    public Licenses?: License[];
}

// Model for ResumeData
const ResumeScanDataModel = getModelForClass(ResumeScanDataClass);

export { ResumeScanDataModel, ResumeScanDataClass, Education, EducationDetail, Position };
