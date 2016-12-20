import angular from 'angular';

let componentsModule = angular.module('closetboxAdmin.components', []);

// TODO: post-labor day, we need to document well directive and component

import MarketMultiSelect from './market-multi-select/market-multi-select.component.js';
componentsModule.component('cbMarketMultiSelect', MarketMultiSelect);

import DispositionMultiSelect from './disposition-multi-select/disposition-multi-select.component.js';
componentsModule.component('cbDispositionMultiSelect', DispositionMultiSelect);

import AgentSelect from './agent-select/agent-select.component.js';
componentsModule.component('cbAgentSelect', AgentSelect);

import SimpleSearchBox from './simple-search-box/simple-search-box.component.js';
componentsModule.component('cbSimpleSearchBox', SimpleSearchBox);

import BookmarkBar from './bookmark-bar/bookmark-bar.component.js';
componentsModule.component('cbBookmarkBar', BookmarkBar);

import ListErrors from './list-errors.component';
componentsModule.component('listErrors', ListErrors);

import PhoneInput from './phone-input.component';
componentsModule.component('cbPhoneInput', PhoneInput);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FullMode from './full-mode.directive';
componentsModule.directive('fullMode', FullMode);

import SideNavExpanded from './side-nav-expanded.direcitve';
componentsModule.directive('sideNavExpanded', SideNavExpanded);

import CompareTo from './compare-to.directive';
componentsModule.directive('compareTo', CompareTo);

import CompareMinmax from './compare-minmax.directive';
componentsModule.directive('compareMinmax', CompareMinmax);

import MyEnter from './my-enter.directive';
componentsModule.directive('myEnter', MyEnter);

import ScrollTo from './scroll-to.directive';
componentsModule.directive('scrollTo', ScrollTo);

import JumpTo from './jump-to.directive';
componentsModule.directive('jumpTo', JumpTo);

import hideWhenClickAnywhere from './hidden-click-anywhere.directive.js';
componentsModule.directive('hideWhenClickAnywhere', hideWhenClickAnywhere);

import processingDialog from './processing-dialog.directive';
componentsModule.directive('processingDialog', processingDialog);

import formattedPhoneNumberLink from './format-phone-number.directive';
componentsModule.directive('cbFormattedPhoneNumberLink', formattedPhoneNumberLink);

import validateAndFormatPhoneNumber from './validate-and-format-phone-number.directive';
componentsModule.directive('cbValidateAndFormatPhoneNumber', validateAndFormatPhoneNumber);

import timezoneFilter from './timezoneFilter.filter';
componentsModule.filter('timezoneFilter', timezoneFilter);

import humanizeFilter from './humanizeFilter.filter';
componentsModule.filter('humanizeFilter', humanizeFilter);

import dateAPFilter from './dateAP.filter';
componentsModule.filter('dateAP', dateAPFilter);

import dateCustomFilter from './dateCustom.filter';
componentsModule.filter('dateCustom', dateCustomFilter);

import durationDateHFilter from './durationDateH.filter';
componentsModule.filter('durationDateH', durationDateHFilter);

export default componentsModule;
