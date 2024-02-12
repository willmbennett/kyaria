import { prop, getModelForClass, ModelOptions, Severity, mongoose } from '@typegoose/typegoose';

class DateRange {
    @prop()
    public str?: string;

    @prop()
    public precision?: number;

    @prop()
    public timestamp?: number;
}

class Contact {
    @prop({ required: true })
    public contactString: string;

    @prop()
    public type?: string;
}

class Image {
    @prop()
    classifications?: string;

    @prop()
    fingerprint?: string;

    @prop()
    title?: string;

    @prop()
    isCached?: boolean;

    @prop()
    url?: string;
}

class Category {
    @prop({ type: () => [String] })
    types?: string[];

    @prop()
    name?: string;

    @prop()
    diffbotUri?: string;

    @prop()
    targetDiffbotId?: string;

    @prop()
    type?: string;
}


class LinkedEntity {
    @prop()
    name?: string;

    @prop({ type: () => [String] })
    websiteUris?: string[];

    @prop()
    surfaceForm?: string;

    @prop()
    summary?: string;

    @prop()
    image?: string;

    @prop({ type: () => [Image] })
    images?: Image[];

    @prop({ type: () => [String] })
    types?: string[];

    @prop()
    diffbotUri?: string;

    @prop()
    targetDiffbotUri?: string;
}

class Award {
    @prop()
    date?: DateRange;

    @prop()
    title?: string;
}

class RawAdministrativeArea {
    @prop()
    type: string;

    // Add other necessary properties here
}

class Location {
    @prop()
    country?: {
        summary?: string;
        image?: string;
        types?: string[];
        name?: string;
        diffbotUri?: string;
        targetDiffbotUri?: string;
        targetDiffbotId?: string;
        type?: string;
    };

    @prop()
    isCurrent?: boolean;

    @prop()
    address?: string;

    @prop()
    city?: {
        summary?: string;
        image?: string;
        types?: string[];
        name?: string;
        diffbotUri?: string;
        targetDiffbotUri?: string;
        targetDiffbotId?: string;
        type?: string;
    };

    @prop()
    subregion?: {
        summary?: string;
        image?: string;
        types?: string[];
        name?: string;
        diffbotUri?: string;
        targetDiffbotUri?: string;
        targetDiffbotId?: string;
        type?: string;
    };

    @prop()
    latitude?: number;

    @prop()
    longitude?: number;

    @prop()
    precision?: number;

    @prop()
    postalCode?: string;

    @prop()
    surfaceForm?: string;

    @prop()
    region?: {
        summary?: string;
        image?: string;
        types?: string[];
        name?: string;
        diffbotUri?: string;
        targetDiffbotUri?: string;
        targetDiffbotId?: string;
        type?: string;
    };

    @prop()
    rawAdministrativeArea?: RawAdministrativeArea;
}

class Education {
    @prop()
    institution?: {
        summary?: string;
        image?: string;
        types?: string[];
        name?: string;
        diffbotUri?: string;
        targetDiffbotUri?: string;
        targetDiffbotId?: string;
        surfaceForm?: string;
        type?: string;
    };

    @prop()
    isCurrent?: boolean;

    @prop()
    major?: {
        recordId?: string;
        name?: string;
        surfaceForm?: string;
        position?: string;
        type?: string;
    };

    @prop()
    degree?: {
        types?: string[];
        name?: string;
        diffbotUri?: string;
        targetDiffbotUri?: string;
        targetDiffbotId?: string;
        surfaceForm?: string;
        type?: string;
    };

    @prop()
    from?: DateRange;

    @prop()
    to?: DateRange;
}

class Employment {
    @prop()
    isCurrent?: boolean;

    @prop()
    employer?: {
        summary?: string;
        image?: string;
        types?: string[];
        name?: string;
        diffbotUri?: string;
        targetDiffbotId?: string;
        type?: string;
    };

    @prop()
    description?: string;

    @prop()
    from?: DateRange;

    @prop({ type: () => [Category] }) // Assuming Category is correctly defined
    categories?: Category[];

    @prop()
    title?: string;

    @prop()
    location?: Location; // Ensure this matches the expected structure

    @prop()
    to?: DateRange;
}


class NameDetail {
    @prop()
    firstName?: string;

    @prop()
    lastName?: string;
}

class Language {
    @prop()
    str: string; // Assuming this is a required field

    @prop()
    normalizedValue?: string; // Optional field
}

class Union {
    @prop()
    public isCurrent?: boolean;

    @prop({ _id: false, type: () => LinkedEntity })
    public person?: LinkedEntity;

    @prop({ _id: false, type: () => DateRange })
    public from?: DateRange;

    @prop({ _id: false, type: () => DateRange })
    public to?: DateRange;

    @prop()
    public type?: string;
}

class ImageField {
    @prop()
    classifications?: string;

    @prop()
    fingerprint?: string;

    @prop()
    title?: string;

    @prop()
    isCached?: string;

    @prop()
    url?: string;
}

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        versionKey: false,
        collection: "people",
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
class PersonClass {
    @prop()
    public diffbotId?: string;

    @prop()
    public name?: string;

    @prop()
    public summary?: string;

    @prop()
    description?: string;

    @prop()
    allDescriptions?: string[];

    @prop()
    importance?: number;

    @prop()
    age?: number;

    @prop()
    angellistUri?: string;

    @prop({ type: () => [LinkedEntity] })
    articles?: LinkedEntity[];

    @prop({ type: () => [Award] })
    awards?: Award[];

    @prop()
    birthDate?: DateRange;

    @prop()
    birthPlace?: Location;

    @prop()
    blogUri?: string;

    @prop({ type: () => [LinkedEntity] })
    children?: LinkedEntity[];

    @prop({ type: () => [LinkedEntity] })
    colleagues?: LinkedEntity[];

    @prop()
    connectedIndustries?: string;

    @prop()
    crunchbaseUri?: string;

    @prop()
    deathDate?: DateRange;

    @prop()
    deathPlace?: Location;

    @prop({ type: () => [Education] })
    educations?: Education[];

    @prop({ type: () => [Contact] })
    emailAddresses?: Contact[];

    @prop({ type: () => [Employment] })
    employments?: Employment[];

    @prop()
    eyeColor?: string;

    @prop()
    facebookUri?: string;

    @prop({ type: () => [LinkedEntity] })
    friends?: LinkedEntity[];

    @prop()
    gender?: { normalizedValue: string };

    @prop()
    githubUri?: string;

    @prop()
    googlePlusUri?: string;

    @prop()
    hairColor?: string;

    @prop()
    image?: string;

    @prop({ type: () => [ImageField] })
    images?: ImageField[]

    @prop()
    height?: number;

    @prop()
    homepageUri?: string;

    @prop()
    instagramUri?: string;

    @prop({ type: () => [LinkedEntity] })
    interests?: LinkedEntity[];

    @prop({ type: () => [Language] })
    languages?: Language[];

    @prop()
    linkedInUri?: string;

    @prop()
    location?: Location;

    @prop({ type: () => [Location] })
    locations?: Location[];

    @prop()
    nameDetail?: NameDetail;

    @prop({ type: () => [LinkedEntity] })
    nationalities?: LinkedEntity[];

    @prop()
    netWorth?: {
        currency?: string;
        value?: number;
    };

    @prop()
    npiNumbers?: string;

    @prop({ type: () => [LinkedEntity] })
    parents?: LinkedEntity[];

    @prop()
    phoneNumbers?: {
        string: string,
        digits: string
    }[];

    @prop({ type: () => [LinkedEntity] })
    politicalAffiliation?: LinkedEntity[];

    @prop()
    religion?: { str: string };

    @prop({ type: () => [LinkedEntity] })
    siblings?: LinkedEntity[];

    @prop({ type: () => [LinkedEntity] })
    skills?: LinkedEntity[];

    @prop()
    twitterUri?: string;

    @prop({ type: () => [Union] })
    unions?: Union[];

    @prop()
    weight?: number;

    @prop()
    wikipediaUri?: string;

    @prop()
    youtubeUri?: string;

    @prop()
    embeddingsText?: string;

    @prop()
    text_embeddings?: number[];

    _id: mongoose.Types.ObjectId | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const PersonModel = getModelForClass(PersonClass);
export { PersonModel, PersonClass };
