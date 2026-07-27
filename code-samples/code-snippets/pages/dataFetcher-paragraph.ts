import {paragraphProcessor} from '/react4xp/components/parts/ParagraphProcessor';

...

export const dataFetcher = new DataFetcher();

...

dataFetcher.addPart('com.enonic.app.hmdb:paragraph', {processor: paragraphProcessor});
