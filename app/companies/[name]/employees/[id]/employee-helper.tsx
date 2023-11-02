export class Employee {
    image: string;
    name: string;
    summary: string;
    description: string;
    crunchbaseUri: string;
    linkedInUri: string;
    emailAddresses: {contactString: string, type: string}[]
}