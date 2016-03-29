import {DynamicComponentLoader, Injectable, ComponentRef, ElementRef, ResolvedProvider} from 'angular2/core';
import {Type} from 'angular2/src/facade/lang';

@Injectable()
export default class AuiNgPortal {

    constructor(
        private _componentLoader: DynamicComponentLoader
    ) {}

    port(component: Type, origin: ElementRef, host: Element, providers?: ResolvedProvider[]):Promise<ComponentRef> {
        return this._componentLoader.loadNextToLocation(component, origin, providers).then(ref => {
            // this is where the magic happens:
            // moves the DOM node to a new location (can also be outside of
            // the angular app context)
            host.appendChild(ref.hostView.rootNodes[0]);
            return ref;
        });
    }

}
