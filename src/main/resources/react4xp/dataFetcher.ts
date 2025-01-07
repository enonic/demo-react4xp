import { DataFetcher } from '/lib/enonic/react4xp';
import { helloProcessor } from './components/HelloProcessor';

export const dataFetcher = new DataFetcher();
dataFetcher.addContentType('portal:site', { processor: helloProcessor }); // <1>