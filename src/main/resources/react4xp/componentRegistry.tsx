//import {Hello} from './components/hello/Hello';
import {ComponentRegistry} from '@enonic/react-components';
import {Article} from "./components/content/Article";
import {Person} from './components/content/Person';
import {Playlist} from './components/content/Playlist';
import {TwoColumnLayout} from './components/layouts/TwoColumn';
import {Factbox} from './components/macro/FactBox';
import {Page} from './components/page/Page';
import {ChildList} from './components/parts/ChildList';
import {Heading} from './components/parts/Heading';
import {Movie} from './components/parts/Movie';

export const componentRegistry = new ComponentRegistry();


componentRegistry.addMacro('factbox', {View: Factbox});
//componentRegistry.addContentType('portal:site', { View: Hello }); // <1>
componentRegistry.addPart('com.enonic.app.hmdb:heading', {View: Heading}); // <2>
componentRegistry.addPage('com.enonic.app.hmdb:main', {View: Page}); // <3>
componentRegistry.addContentType('com.enonic.app.hmdb:person', {View: Person}); // <4>
componentRegistry.addPart('com.enonic.app.hmdb:movie-details', {View: Movie}); // <5>
componentRegistry.addLayout('com.enonic.app.hmdb:2-column', {View: TwoColumnLayout}); // <6>
componentRegistry.addPart('com.enonic.app.hmdb:child-list', {View: ChildList}); // <7>
componentRegistry.addContentType('com.enonic.app.hmdb:playlist', {View: Playlist}); // <8>
componentRegistry.addContentType('com.enonic.app.hmdb:article', {View: Article}); // <9>
