/// <reference types="react" />
interface IProps {
    age: number;
    docid: string;
    end: number;
    fetalcount: number;
    inpatientNO: string;
    name: string;
    start: number;
    startdate: string;
    print_interval: number;
    onDownload: () => void;
    wh: {
        w: number;
        h: number;
    };
    gestationalWeek?: any;
}
declare const Preview: (props: IProps) => JSX.Element;
export default Preview;
