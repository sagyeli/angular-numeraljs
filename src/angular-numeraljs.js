/*global numeral */
'use strict';
angular.module('ngNumeraljs', [])
    .filter('numeraljs', ['$sce', function ($sce) {
        return function (input, format) {
            if (input == null || format == null) 
                return input;
            if (format === '') 
                return '';

            var nums = numeral(input).format(format).split('.');
            if (nums.length > 1) {
                nums[0] = '<span class="numeral-left">' + nums[0] + '</span>';
            	nums[1] = '<span class="numeral-right">.' + nums[1] + '</span>';
            }
            else {
                nums[0] = '<span class="numeral-integer">' + nums[0] + '</span>';
            }

            return $sce.trustAsHtml(nums.join(''));
        };
    }]);
