import {Paragraph} from '/react4xp/components/parts/Paragraph';

...

export const componentRegistry = new ComponentRegistry();

...

componentRegistry.addPart('com.enonic.app.hmdb:paragraph', {View: Paragraph});
