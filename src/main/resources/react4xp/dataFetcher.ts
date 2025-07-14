import {DataFetcher} from '/lib/enonic/react4xp';
//import {helloProcessor} from './components/hello/HelloProcessor';
import {commonProcessor} from '/react4xp/components/common/CommonProcessor';
import {articleProcessor} from "./components/content/ArticleProcessor";
import {personProcessor} from './components/content/PersonProcessor';
import {playlistProcessor} from './components/content/PlaylistProcessor';
import {childListProcessor} from './components/parts/ChildListProcessor';
import {headingProcessor} from './components/parts/HeadingProcessor';
import {movieProcessor} from "./components/parts/MovieProcessor";
import {factboxProcessor} from "./components/macro/FactboxProcessor";

export const dataFetcher = new DataFetcher();
//dataFetcher.addContentType('portal:site', { processor: helloProcessor });
dataFetcher.addCommon({processor: commonProcessor});
dataFetcher.addPart('com.enonic.app.hmdb:heading', {processor: headingProcessor});
dataFetcher.addContentType('com.enonic.app.hmdb:person', {processor: personProcessor});
dataFetcher.addPart('com.enonic.app.hmdb:movie-details', {processor: movieProcessor});
dataFetcher.addPart('com.enonic.app.hmdb:child-list', {processor: childListProcessor});
dataFetcher.addContentType('com.enonic.app.hmdb:playlist', {processor: playlistProcessor});
dataFetcher.addContentType('com.enonic.app.hmdb:article', {processor: articleProcessor});

// @ts-ignore update type in addMacro
dataFetcher.addMacro('factbox', {processor: factboxProcessor});
