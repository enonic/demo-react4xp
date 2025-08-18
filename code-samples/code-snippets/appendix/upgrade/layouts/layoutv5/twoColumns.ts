import {render} from '/lib/enonic/react4xp';
import {getComponent} from '/lib/xp/portal';
import type {Enonic} from '@enonic/js-utils/types/Request';
import type {Regions} from '@enonic/react-components';


export function get(request: Enonic.Xp.Http.Request) {

    const component = getComponent();

    const props: Parameters<typeof Regions>[0] = {
        classes: true,
        names: ['left', 'right'],
        regionsData: component.regions,
        tags: 'section',
    };

    return render(
        component,
        props,
        request,
        {
            hydrate: false,
        }
    );
}
