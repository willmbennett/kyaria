import {
    ModelOptions,
    getModelForClass,
    index,
    prop,
    Severity,
    mongoose,
} from "@typegoose/typegoose";

@ModelOptions({
    schemaOptions: {
        versionKey: false,
        collection: "test",
    },
    options: {
        disableLowerIndexes: true,
        allowMixed: Severity.ALLOW
    }
})
class TestClass {
    @prop({ required: true })
    public name!: string;
}

const TestModel = getModelForClass(TestClass);
export { TestModel, TestClass };