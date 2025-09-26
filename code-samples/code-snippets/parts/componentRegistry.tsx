import {ComponentRegistry} from '@enonic/react-components';
import {ChildList} from './components/parts/ChildList';

...

export const componentRegistry = new ComponentRegistry();

...

componentRegistry.addPart('com.enonic.app.hmdb:child-list', {View: ChildList});
