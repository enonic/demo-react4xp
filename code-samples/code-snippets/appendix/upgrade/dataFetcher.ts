import {DataFetcher} from '/lib/enonic/react4xp';
import {exampleProcessor} from './components/parts/example/exampleProcessor';

...

export const dataFetcher = new DataFetcher();

...

dataFetcher.addPart('com.enonic.app.react4xp:example', {processor: exampleProcessor});
