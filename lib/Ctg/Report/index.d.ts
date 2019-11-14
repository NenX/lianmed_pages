import React from 'react';
export declare const Context: React.Context<{}>;
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
}
declare const PrintPreview: (props: IProps) => JSX.Element;
export default PrintPreview;
