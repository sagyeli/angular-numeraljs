/*global numeral */
'use strict';
angular.module('ngNumeraljs', [])
    .filter('numeraljs', ['$sce', function ($sce) {
        return function (input, format) {
            if (input == null || format == null) 
                return input;
            if (format === '') 
                return '';
            if (format.indexOf('.') < 0) 
                format += '.0';

            var nums = numeral(input).format(format).replace(/0+(?=\D+$)|0+$/g, '').replace(/(^\D*|:)?0+/g, function(str, p1) {return p1 ? p1 + '0' : str;}).split('.');
            if (nums.length > 1 && parseInt(nums[1].replace('/\D/g', '')) > 0) {
                nums[0] = '<span class="numeral-left">' + nums[0] + '</span>';
            	nums[1] = '<span class="numeral-right">.' + nums[1] + '</span>';
            }
            else {
                nums[0] = '<span class="numeral-integer">' + nums[0] + '</span>';
                nums = [nums[0]];
            }

            return $sce.trustAsHtml(nums.join(''));
        };
    }]);
