import ChartConfigBase from "../../../view/Charts/ChartConfigBase";
import { validate } from '../../../tools/ChartConfigValidator';

describe('ChartConfigBase behaves as expected', () => {
    describe('with valid parameters', () => {
        let title = 'Config Title';
        let type = 'Config Type';
        let labels = ['label1','label2'];
        let width = 10;
        let height = 20;
        let isHorizontle = 'false';

        let chartConfigBase;
        test('constructor() returns new ChartConfigBase.', () => {
            chartConfigBase = new ChartConfigBase(title, type, labels, width, height, isHorizontle);
        });
        test('getDatasets() matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.getDatasets())).toMatchSnapshot();
        });
        test('getElements() matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.getElements())).toMatchSnapshot();
        });
        test('getHeight() matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.getHeight())).toMatchSnapshot();
        });
        test('getOptions() matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.getOptions())).toMatchSnapshot();
        });
        test('getLabels() matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.getLabels())).toMatchSnapshot();
        });
        test('getPlugins() matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.getPlugins())).toMatchSnapshot();
        });
        test('getScales() matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.getScales())).toMatchSnapshot();
        });
        test('getStyle() matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.getStyle())).toMatchSnapshot();
        });
        test('getTitle() matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.getTitle())).toMatchSnapshot();
        });
        test('getType() matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.getType())).toMatchSnapshot();
        });
        test('getWidth() matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.getWidth())).toMatchSnapshot();
        });
        test('isHorizontle() matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.isHorizontle())).toMatchSnapshot();
        });
        test('isResponsive() matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.isResponsive())).toMatchSnapshot();
        });
        test('validate() returns normally.', () => {
            validate(chartConfigBase.getConfig());
        });
        test('getConfig()  matches snapshot.', () => {
            expect(JSON.stringify(chartConfigBase.getConfig())).toMatchSnapshot();
        });
    });
    describe('with invalid parameters', () => {
        const title = 'Title';
        const type = 'Type';
        const labels = ['lable'];
        const width = 10;
        const height = 20;
        const isHorizontle = false;
        test('throws on undefined title.', () => {
            try{
                new ChartConfigBase(undefined, type, labels, width, height, isHorizontle);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
        test('throws on non-string title.', () => {
            try{
                new ChartConfigBase(1234, type, labels, width, height, isHorizontle);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
        test('throws on undefined type.', () => {
            try{
                new ChartConfigBase(title, undefined, labels, width, height, isHorizontle);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
        test('throws on non-string type.', () => {
            try{
                new ChartConfigBase(title, 1234, labels, width, height, isHorizontle);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
        test('throws on non-boolean horizontle.', () => {
            try{
                new ChartConfigBase(title, type, labels, width, height, 'true');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
        test('throws on invalid labels.', () => {
            try{
                new ChartConfigBase(title, type, [1,2], width, height, isHorizontle);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
        test('throws on non-numeric width.', () => {
            try{
                new ChartConfigBase(title, type, labels, 'width', height, isHorizontle);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
        test('throws on non-numeric height.', () => {
            try{
                new ChartConfigBase(title, type, labels, width, 'height', isHorizontle);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
    });
});