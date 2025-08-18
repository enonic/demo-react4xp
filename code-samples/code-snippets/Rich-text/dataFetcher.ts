import {DataFetcher} from '/lib/enonic/react4xp';
import {commonProcessor} from '/react4xp/components/common/CommonProcessor';
import {personProcessor} from './components/content/PersonProcessor';
import {helloProcessor} from './components/hello/HelloProcessor';
import {factboxProcessor} from "./components/macro/FactboxProcessor";

export const dataFetcher = new DataFetcher();

dataFetcher.addContentType('portal:site', {processor: helloProcessor});
dataFetcher.addCommon({processor: commonProcessor});
dataFetcher.addContentType('com.enonic.app.hmdb:person', {processor: personProcessor});
dataFetcher.addMacro('factbox', {processor: factboxProcessor});
