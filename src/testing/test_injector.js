'use strict';var di_1 = require('angular2/src/core/di');
var animation_builder_1 = require('angular2/src/animate/animation_builder');
var animation_builder_mock_1 = require('angular2/src/mock/animation_builder_mock');
var proto_view_factory_1 = require('angular2/src/core/linker/proto_view_factory');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var exceptions_1 = require('angular2/src/facade/exceptions');
var view_resolver_1 = require('angular2/src/core/linker/view_resolver');
var directive_resolver_1 = require('angular2/src/core/linker/directive_resolver');
var pipe_resolver_1 = require('angular2/src/core/linker/pipe_resolver');
var dynamic_component_loader_1 = require('angular2/src/core/linker/dynamic_component_loader');
var xhr_1 = require('angular2/src/compiler/xhr');
var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var directive_resolver_mock_1 = require('angular2/src/mock/directive_resolver_mock');
var view_resolver_mock_1 = require('angular2/src/mock/view_resolver_mock');
var mock_location_strategy_1 = require('angular2/src/mock/mock_location_strategy');
var location_strategy_1 = require('angular2/src/router/location_strategy');
var ng_zone_mock_1 = require('angular2/src/mock/ng_zone_mock');
var test_component_builder_1 = require('./test_component_builder');
var di_2 = require('angular2/src/core/di');
var common_dom_1 = require('angular2/platform/common_dom');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var view_pool_1 = require('angular2/src/core/linker/view_pool');
var view_manager_1 = require('angular2/src/core/linker/view_manager');
var view_manager_utils_1 = require('angular2/src/core/linker/view_manager_utils');
var api_1 = require('angular2/src/core/render/api');
var dom_tokens_1 = require('angular2/src/platform/dom/dom_tokens');
var dom_renderer_1 = require('angular2/src/platform/dom/dom_renderer');
var shared_styles_host_1 = require('angular2/src/platform/dom/shared_styles_host');
var shared_styles_host_2 = require('angular2/src/platform/dom/shared_styles_host');
var dom_events_1 = require('angular2/src/platform/dom/events/dom_events');
var application_tokens_1 = require('angular2/src/core/application_tokens');
var serializer_1 = require("angular2/src/web_workers/shared/serializer");
var utils_1 = require('./utils');
var compiler_1 = require('angular2/src/compiler/compiler');
var dom_renderer_2 = require("angular2/src/platform/dom/dom_renderer");
var dynamic_component_loader_2 = require("angular2/src/core/linker/dynamic_component_loader");
var view_manager_2 = require("angular2/src/core/linker/view_manager");
var application_common_providers_1 = require('angular2/src/core/application_common_providers');
/**
 * Returns the root injector providers.
 *
 * This must be kept in sync with the _rootBindings in application.js
 *
 * @returns {any[]}
 */
function _getRootProviders() {
    return [di_1.provide(reflection_1.Reflector, { useValue: reflection_1.reflector })];
}
/**
 * Returns the application injector providers.
 *
 * This must be kept in sync with _injectorBindings() in application.js
 *
 * @returns {any[]}
 */
function _getAppBindings() {
    var appDoc;
    // The document is only available in browser environment
    try {
        appDoc = dom_adapter_1.DOM.defaultDoc();
    }
    catch (e) {
        appDoc = null;
    }
    return [
        application_common_providers_1.APPLICATION_COMMON_PROVIDERS,
        di_1.provide(change_detection_1.ChangeDetectorGenConfig, { useValue: new change_detection_1.ChangeDetectorGenConfig(true, false, true) }),
        di_1.provide(dom_tokens_1.DOCUMENT, { useValue: appDoc }),
        di_1.provide(dom_renderer_1.DomRenderer, { useClass: dom_renderer_2.DomRenderer_ }),
        di_1.provide(api_1.Renderer, { useExisting: dom_renderer_1.DomRenderer }),
        di_1.provide(application_tokens_1.APP_ID, { useValue: 'a' }),
        shared_styles_host_1.DomSharedStylesHost,
        di_1.provide(shared_styles_host_2.SharedStylesHost, { useExisting: shared_styles_host_1.DomSharedStylesHost }),
        view_pool_1.AppViewPool,
        di_1.provide(view_manager_1.AppViewManager, { useClass: view_manager_2.AppViewManager_ }),
        view_manager_utils_1.AppViewManagerUtils,
        serializer_1.Serializer,
        common_dom_1.ELEMENT_PROBE_PROVIDERS,
        di_1.provide(view_pool_1.APP_VIEW_POOL_CAPACITY, { useValue: 500 }),
        proto_view_factory_1.ProtoViewFactory,
        di_1.provide(directive_resolver_1.DirectiveResolver, { useClass: directive_resolver_mock_1.MockDirectiveResolver }),
        di_1.provide(view_resolver_1.ViewResolver, { useClass: view_resolver_mock_1.MockViewResolver }),
        di_1.provide(change_detection_1.IterableDiffers, { useValue: change_detection_1.defaultIterableDiffers }),
        di_1.provide(change_detection_1.KeyValueDiffers, { useValue: change_detection_1.defaultKeyValueDiffers }),
        utils_1.Log,
        di_1.provide(dynamic_component_loader_1.DynamicComponentLoader, { useClass: dynamic_component_loader_2.DynamicComponentLoader_ }),
        pipe_resolver_1.PipeResolver,
        di_1.provide(exceptions_1.ExceptionHandler, { useValue: new exceptions_1.ExceptionHandler(dom_adapter_1.DOM) }),
        di_1.provide(location_strategy_1.LocationStrategy, { useClass: mock_location_strategy_1.MockLocationStrategy }),
        di_1.provide(xhr_1.XHR, { useClass: dom_adapter_1.DOM.getXHR() }),
        test_component_builder_1.TestComponentBuilder,
        di_1.provide(ng_zone_1.NgZone, { useClass: ng_zone_mock_1.MockNgZone }),
        di_1.provide(animation_builder_1.AnimationBuilder, { useClass: animation_builder_mock_1.MockAnimationBuilder }),
        common_dom_1.EventManager,
        new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: dom_events_1.DomEventsPlugin, multi: true })
    ];
}
function _runtimeCompilerBindings() {
    return [
        di_1.provide(xhr_1.XHR, { useClass: dom_adapter_1.DOM.getXHR() }),
        compiler_1.COMPILER_PROVIDERS,
    ];
}
function createTestInjector(providers) {
    var rootInjector = di_2.Injector.resolveAndCreate(_getRootProviders());
    return rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(_getAppBindings(), providers));
}
exports.createTestInjector = createTestInjector;
function createTestInjectorWithRuntimeCompiler(providers) {
    return createTestInjector(collection_1.ListWrapper.concat(_runtimeCompilerBindings(), providers));
}
exports.createTestInjectorWithRuntimeCompiler = createTestInjectorWithRuntimeCompiler;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`. When using with the
 * `angular2/testing` library, the test function will be run within a zone and will
 * automatically complete when all asynchronous tests have finished.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething().then(() => {
 *     expect(...);
 *   });
 * })
 * ```
 *
 * Notes:
 * - inject is currently a function because of some Traceur limitation the syntax should eventually
 *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * @param {Array} tokens
 * @param {Function} fn
 * @return {FunctionWithParamTokens}
 */
function inject(tokens, fn) {
    return new FunctionWithParamTokens(tokens, fn, false);
}
exports.inject = inject;
/**
 * @deprecated Use inject instead, which now supports both synchronous and asynchronous tests.
 */
function injectAsync(tokens, fn) {
    return new FunctionWithParamTokens(tokens, fn, true);
}
exports.injectAsync = injectAsync;
var FunctionWithParamTokens = (function () {
    function FunctionWithParamTokens(_tokens, _fn, isAsync) {
        this._tokens = _tokens;
        this._fn = _fn;
        this.isAsync = isAsync;
    }
    /**
     * Returns the value of the executed function.
     */
    FunctionWithParamTokens.prototype.execute = function (injector) {
        var params = this._tokens.map(function (t) { return injector.get(t); });
        return lang_1.FunctionWrapper.apply(this._fn, params);
    };
    FunctionWithParamTokens.prototype.hasToken = function (token) { return this._tokens.indexOf(token) > -1; };
    return FunctionWithParamTokens;
})();
exports.FunctionWithParamTokens = FunctionWithParamTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9pbmplY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy90ZXN0aW5nL3Rlc3RfaW5qZWN0b3IudHMiXSwibmFtZXMiOlsiX2dldFJvb3RQcm92aWRlcnMiLCJfZ2V0QXBwQmluZGluZ3MiLCJfcnVudGltZUNvbXBpbGVyQmluZGluZ3MiLCJjcmVhdGVUZXN0SW5qZWN0b3IiLCJjcmVhdGVUZXN0SW5qZWN0b3JXaXRoUnVudGltZUNvbXBpbGVyIiwiaW5qZWN0IiwiaW5qZWN0QXN5bmMiLCJGdW5jdGlvbldpdGhQYXJhbVRva2VucyIsIkZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zLmNvbnN0cnVjdG9yIiwiRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnMuZXhlY3V0ZSIsIkZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zLmhhc1Rva2VuIl0sIm1hcHBpbmdzIjoiQUFBQSxtQkFBZ0Msc0JBQXNCLENBQUMsQ0FBQTtBQUN2RCxrQ0FBK0Isd0NBQXdDLENBQUMsQ0FBQTtBQUN4RSx1Q0FBbUMsMENBQTBDLENBQUMsQ0FBQTtBQUU5RSxtQ0FBK0IsNkNBQTZDLENBQUMsQ0FBQTtBQUM3RSwyQkFBbUMseUNBQXlDLENBQUMsQ0FBQTtBQUM3RSxpQ0FNTyxxREFBcUQsQ0FBQyxDQUFBO0FBQzdELDJCQUErQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ2hFLDhCQUEyQix3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3BFLG1DQUFnQyw2Q0FBNkMsQ0FBQyxDQUFBO0FBQzlFLDhCQUEyQix3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3BFLHlDQUFxQyxtREFBbUQsQ0FBQyxDQUFBO0FBQ3pGLG9CQUFrQiwyQkFBMkIsQ0FBQyxDQUFBO0FBQzlDLHdCQUFxQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBRXRELDRCQUFrQix1Q0FBdUMsQ0FBQyxDQUFBO0FBRTFELHdDQUFvQywyQ0FBMkMsQ0FBQyxDQUFBO0FBQ2hGLG1DQUErQixzQ0FBc0MsQ0FBQyxDQUFBO0FBQ3RFLHVDQUFt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QUZlLG1CQUFXLGNBRTFCLENBQUE7QUFFRDtJQUNFQyxpQ0FBb0JBLE9BQWNBLEVBQVVBLEdBQWFBLEVBQVNBLE9BQWdCQTtRQUE5REMsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBT0E7UUFBVUEsUUFBR0EsR0FBSEEsR0FBR0EsQ0FBVUE7UUFBU0EsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBU0E7SUFBR0EsQ0FBQ0E7SUFFdEZEOztPQUVHQTtJQUNIQSx5Q0FBT0EsR0FBUEEsVUFBUUEsUUFBa0JBO1FBQ3hCRSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFBQSxDQUFDQSxJQUFJQSxPQUFBQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFmQSxDQUFlQSxDQUFDQSxDQUFDQTtRQUNwREEsTUFBTUEsQ0FBQ0Esc0JBQWVBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO0lBQ2pEQSxDQUFDQTtJQUVERiwwQ0FBUUEsR0FBUkEsVUFBU0EsS0FBVUEsSUFBYUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDNUVILDhCQUFDQTtBQUFEQSxDQUFDQSxBQVpELElBWUM7QUFaWSwrQkFBdUIsMEJBWW5DLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Byb3ZpZGUsIFByb3ZpZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2FuaW1hdGlvbl9idWlsZGVyJztcbmltcG9ydCB7TW9ja0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL2FuaW1hdGlvbl9idWlsZGVyX21vY2snO1xuXG5pbXBvcnQge1Byb3RvVmlld0ZhY3Rvcnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9wcm90b192aWV3X2ZhY3RvcnknO1xuaW1wb3J0IHtSZWZsZWN0b3IsIHJlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcbmltcG9ydCB7XG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgZGVmYXVsdEl0ZXJhYmxlRGlmZmVycyxcbiAgS2V5VmFsdWVEaWZmZXJzLFxuICBkZWZhdWx0S2V5VmFsdWVEaWZmZXJzLFxuICBDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZ1xufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb24nO1xuaW1wb3J0IHtFeGNlcHRpb25IYW5kbGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtWaWV3UmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X3Jlc29sdmVyJztcbmltcG9ydCB7RGlyZWN0aXZlUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9kaXJlY3RpdmVfcmVzb2x2ZXInO1xuaW1wb3J0IHtQaXBlUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9waXBlX3Jlc29sdmVyJztcbmltcG9ydCB7RHluYW1pY0NvbXBvbmVudExvYWRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2R5bmFtaWNfY29tcG9uZW50X2xvYWRlcic7XG5pbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5pbXBvcnQge05nWm9uZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvem9uZS9uZ196b25lJztcblxuaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuXG5pbXBvcnQge01vY2tEaXJlY3RpdmVSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL21vY2svZGlyZWN0aXZlX3Jlc29sdmVyX21vY2snO1xuaW1wb3J0IHtNb2NrVmlld1Jlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay92aWV3X3Jlc29sdmVyX21vY2snO1xuaW1wb3J0IHtNb2NrTG9jYXRpb25TdHJhdGVneX0gZnJvbSAnYW5ndWxhcjIvc3JjL21vY2svbW9ja19sb2NhdGlvbl9zdHJhdGVneSc7XG5pbXBvcnQge0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb25fc3RyYXRlZ3knO1xuaW1wb3J0IHtNb2NrTmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9uZ196b25lX21vY2snO1xuXG5pbXBvcnQge1Rlc3RDb21wb25lbnRCdWlsZGVyfSBmcm9tICcuL3Rlc3RfY29tcG9uZW50X2J1aWxkZXInO1xuXG5pbXBvcnQge0luamVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1xuICBFdmVudE1hbmFnZXIsXG4gIEVWRU5UX01BTkFHRVJfUExVR0lOUyxcbiAgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlNcbn0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uX2RvbSc7XG5cbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0Z1bmN0aW9uV3JhcHBlciwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtBcHBWaWV3UG9vbCwgQVBQX1ZJRVdfUE9PTF9DQVBBQ0lUWX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfcG9vbCc7XG5pbXBvcnQge0FwcFZpZXdNYW5hZ2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdmlld19tYW5hZ2VyJztcbmltcG9ydCB7QXBwVmlld01hbmFnZXJVdGlsc30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfbWFuYWdlcl91dGlscyc7XG5pbXBvcnQge1JlbmRlcmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpJztcblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fdG9rZW5zJztcbmltcG9ydCB7RG9tUmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX3JlbmRlcmVyJztcbmltcG9ydCB7RG9tU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuaW1wb3J0IHtTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5pbXBvcnQge0RvbUV2ZW50c1BsdWdpbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMvZG9tX2V2ZW50cyc7XG5cbmltcG9ydCB7QVBQX0lEfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9hcHBsaWNhdGlvbl90b2tlbnMnO1xuaW1wb3J0IHtTZXJpYWxpemVyfSBmcm9tIFwiYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyXCI7XG5pbXBvcnQge0xvZ30gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge0NPTVBJTEVSX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2NvbXBpbGVyJztcbmltcG9ydCB7RG9tUmVuZGVyZXJffSBmcm9tIFwiYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fcmVuZGVyZXJcIjtcbmltcG9ydCB7RHluYW1pY0NvbXBvbmVudExvYWRlcl99IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvZHluYW1pY19jb21wb25lbnRfbG9hZGVyXCI7XG5pbXBvcnQge0FwcFZpZXdNYW5hZ2VyX30gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X21hbmFnZXJcIjtcbmltcG9ydCB7QVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvYXBwbGljYXRpb25fY29tbW9uX3Byb3ZpZGVycyc7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcm9vdCBpbmplY3RvciBwcm92aWRlcnMuXG4gKlxuICogVGhpcyBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIHRoZSBfcm9vdEJpbmRpbmdzIGluIGFwcGxpY2F0aW9uLmpzXG4gKlxuICogQHJldHVybnMge2FueVtdfVxuICovXG5mdW5jdGlvbiBfZ2V0Um9vdFByb3ZpZGVycygpIHtcbiAgcmV0dXJuIFtwcm92aWRlKFJlZmxlY3Rvciwge3VzZVZhbHVlOiByZWZsZWN0b3J9KV07XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYXBwbGljYXRpb24gaW5qZWN0b3IgcHJvdmlkZXJzLlxuICpcbiAqIFRoaXMgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCBfaW5qZWN0b3JCaW5kaW5ncygpIGluIGFwcGxpY2F0aW9uLmpzXG4gKlxuICogQHJldHVybnMge2FueVtdfVxuICovXG5mdW5jdGlvbiBfZ2V0QXBwQmluZGluZ3MoKSB7XG4gIHZhciBhcHBEb2M7XG5cbiAgLy8gVGhlIGRvY3VtZW50IGlzIG9ubHkgYXZhaWxhYmxlIGluIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAgdHJ5IHtcbiAgICBhcHBEb2MgPSBET00uZGVmYXVsdERvYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgYXBwRG9jID0gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBbXG4gICAgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUyxcbiAgICBwcm92aWRlKENoYW5nZURldGVjdG9yR2VuQ29uZmlnLCB7dXNlVmFsdWU6IG5ldyBDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZyh0cnVlLCBmYWxzZSwgdHJ1ZSl9KSxcbiAgICBwcm92aWRlKERPQ1VNRU5ULCB7dXNlVmFsdWU6IGFwcERvY30pLFxuICAgIHByb3ZpZGUoRG9tUmVuZGVyZXIsIHt1c2VDbGFzczogRG9tUmVuZGVyZXJffSksXG4gICAgcHJvdmlkZShSZW5kZXJlciwge3VzZUV4aXN0aW5nOiBEb21SZW5kZXJlcn0pLFxuICAgIHByb3ZpZGUoQVBQX0lELCB7dXNlVmFsdWU6ICdhJ30pLFxuICAgIERvbVNoYXJlZFN0eWxlc0hvc3QsXG4gICAgcHJvdmlkZShTaGFyZWRTdHlsZXNIb3N0LCB7dXNlRXhpc3Rpbmc6IERvbVNoYXJlZFN0eWxlc0hvc3R9KSxcbiAgICBBcHBWaWV3UG9vbCxcbiAgICBwcm92aWRlKEFwcFZpZXdNYW5hZ2VyLCB7dXNlQ2xhc3M6IEFwcFZpZXdNYW5hZ2VyX30pLFxuICAgIEFwcFZpZXdNYW5hZ2VyVXRpbHMsXG4gICAgU2VyaWFsaXplcixcbiAgICBFTEVNRU5UX1BST0JFX1BST1ZJREVSUyxcbiAgICBwcm92aWRlKEFQUF9WSUVXX1BPT0xfQ0FQQUNJVFksIHt1c2VWYWx1ZTogNTAwfSksXG4gICAgUHJvdG9WaWV3RmFjdG9yeSxcbiAgICBwcm92aWRlKERpcmVjdGl2ZVJlc29sdmVyLCB7dXNlQ2xhc3M6IE1vY2tEaXJlY3RpdmVSZXNvbHZlcn0pLFxuICAgIHByb3ZpZGUoVmlld1Jlc29sdmVyLCB7dXNlQ2xhc3M6IE1vY2tWaWV3UmVzb2x2ZXJ9KSxcbiAgICBwcm92aWRlKEl0ZXJhYmxlRGlmZmVycywge3VzZVZhbHVlOiBkZWZhdWx0SXRlcmFibGVEaWZmZXJzfSksXG4gICAgcHJvdmlkZShLZXlWYWx1ZURpZmZlcnMsIHt1c2VWYWx1ZTogZGVmYXVsdEtleVZhbHVlRGlmZmVyc30pLFxuICAgIExvZyxcbiAgICBwcm92aWRlKER5bmFtaWNDb21wb25lbnRMb2FkZXIsIHt1c2VDbGFzczogRHluYW1pY0NvbXBvbmVudExvYWRlcl99KSxcbiAgICBQaXBlUmVzb2x2ZXIsXG4gICAgcHJvdmlkZShFeGNlcHRpb25IYW5kbGVyLCB7dXNlVmFsdWU6IG5ldyBFeGNlcHRpb25IYW5kbGVyKERPTSl9KSxcbiAgICBwcm92aWRlKExvY2F0aW9uU3RyYXRlZ3ksIHt1c2VDbGFzczogTW9ja0xvY2F0aW9uU3RyYXRlZ3l9KSxcbiAgICBwcm92aWRlKFhIUiwge3VzZUNsYXNzOiBET00uZ2V0WEhSKCl9KSxcbiAgICBUZXN0Q29tcG9uZW50QnVpbGRlcixcbiAgICBwcm92aWRlKE5nWm9uZSwge3VzZUNsYXNzOiBNb2NrTmdab25lfSksXG4gICAgcHJvdmlkZShBbmltYXRpb25CdWlsZGVyLCB7dXNlQ2xhc3M6IE1vY2tBbmltYXRpb25CdWlsZGVyfSksXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIG5ldyBQcm92aWRlcihFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHt1c2VDbGFzczogRG9tRXZlbnRzUGx1Z2luLCBtdWx0aTogdHJ1ZX0pXG4gIF07XG59XG5cbmZ1bmN0aW9uIF9ydW50aW1lQ29tcGlsZXJCaW5kaW5ncygpIHtcbiAgcmV0dXJuIFtcbiAgICBwcm92aWRlKFhIUiwge3VzZUNsYXNzOiBET00uZ2V0WEhSKCl9KSxcbiAgICBDT01QSUxFUl9QUk9WSURFUlMsXG4gIF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUZXN0SW5qZWN0b3IocHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4pOiBJbmplY3RvciB7XG4gIHZhciByb290SW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKF9nZXRSb290UHJvdmlkZXJzKCkpO1xuICByZXR1cm4gcm9vdEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGVDaGlsZChMaXN0V3JhcHBlci5jb25jYXQoX2dldEFwcEJpbmRpbmdzKCksIHByb3ZpZGVycykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGVzdEluamVjdG9yV2l0aFJ1bnRpbWVDb21waWxlcihcbiAgICBwcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IEluamVjdG9yIHtcbiAgcmV0dXJuIGNyZWF0ZVRlc3RJbmplY3RvcihMaXN0V3JhcHBlci5jb25jYXQoX3J1bnRpbWVDb21waWxlckJpbmRpbmdzKCksIHByb3ZpZGVycykpO1xufVxuXG4vKipcbiAqIEFsbG93cyBpbmplY3RpbmcgZGVwZW5kZW5jaWVzIGluIGBiZWZvcmVFYWNoKClgIGFuZCBgaXQoKWAuIFdoZW4gdXNpbmcgd2l0aCB0aGVcbiAqIGBhbmd1bGFyMi90ZXN0aW5nYCBsaWJyYXJ5LCB0aGUgdGVzdCBmdW5jdGlvbiB3aWxsIGJlIHJ1biB3aXRoaW4gYSB6b25lIGFuZCB3aWxsXG4gKiBhdXRvbWF0aWNhbGx5IGNvbXBsZXRlIHdoZW4gYWxsIGFzeW5jaHJvbm91cyB0ZXN0cyBoYXZlIGZpbmlzaGVkLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBiZWZvcmVFYWNoKGluamVjdChbRGVwZW5kZW5jeSwgQUNsYXNzXSwgKGRlcCwgb2JqZWN0KSA9PiB7XG4gKiAgIC8vIHNvbWUgY29kZSB0aGF0IHVzZXMgYGRlcGAgYW5kIGBvYmplY3RgXG4gKiAgIC8vIC4uLlxuICogfSkpO1xuICpcbiAqIGl0KCcuLi4nLCBpbmplY3QoW0FDbGFzc10sIChvYmplY3QpID0+IHtcbiAqICAgb2JqZWN0LmRvU29tZXRoaW5nKCkudGhlbigoKSA9PiB7XG4gKiAgICAgZXhwZWN0KC4uLik7XG4gKiAgIH0pO1xuICogfSlcbiAqIGBgYFxuICpcbiAqIE5vdGVzOlxuICogLSBpbmplY3QgaXMgY3VycmVudGx5IGEgZnVuY3Rpb24gYmVjYXVzZSBvZiBzb21lIFRyYWNldXIgbGltaXRhdGlvbiB0aGUgc3ludGF4IHNob3VsZCBldmVudHVhbGx5XG4gKiAgIGJlY29tZXMgYGl0KCcuLi4nLCBASW5qZWN0IChvYmplY3Q6IEFDbGFzcywgYXN5bmM6IEFzeW5jVGVzdENvbXBsZXRlcikgPT4geyAuLi4gfSk7YFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHRva2Vuc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0Z1bmN0aW9uV2l0aFBhcmFtVG9rZW5zfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0KHRva2VuczogYW55W10sIGZuOiBGdW5jdGlvbik6IEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zIHtcbiAgcmV0dXJuIG5ldyBGdW5jdGlvbldpdGhQYXJhbVRva2Vucyh0b2tlbnMsIGZuLCBmYWxzZSk7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGluamVjdCBpbnN0ZWFkLCB3aGljaCBub3cgc3VwcG9ydHMgYm90aCBzeW5jaHJvbm91cyBhbmQgYXN5bmNocm9ub3VzIHRlc3RzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0QXN5bmModG9rZW5zOiBhbnlbXSwgZm46IEZ1bmN0aW9uKTogRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnMge1xuICByZXR1cm4gbmV3IEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zKHRva2VucywgZm4sIHRydWUpO1xufVxuXG5leHBvcnQgY2xhc3MgRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnMge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90b2tlbnM6IGFueVtdLCBwcml2YXRlIF9mbjogRnVuY3Rpb24sIHB1YmxpYyBpc0FzeW5jOiBib29sZWFuKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZXhlY3V0ZWQgZnVuY3Rpb24uXG4gICAqL1xuICBleGVjdXRlKGluamVjdG9yOiBJbmplY3Rvcik6IGFueSB7XG4gICAgdmFyIHBhcmFtcyA9IHRoaXMuX3Rva2Vucy5tYXAodCA9PiBpbmplY3Rvci5nZXQodCkpO1xuICAgIHJldHVybiBGdW5jdGlvbldyYXBwZXIuYXBwbHkodGhpcy5fZm4sIHBhcmFtcyk7XG4gIH1cblxuICBoYXNUb2tlbih0b2tlbjogYW55KTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl90b2tlbnMuaW5kZXhPZih0b2tlbikgPiAtMTsgfVxufVxuIl19