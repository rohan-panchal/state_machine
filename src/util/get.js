/**
 * Get items from an object at a specified path
 *
 * URL https://gomakethings.com/how-to-get-the-value-of-an-object-from-a-specific-path-with-vanilla-js/
 *
 * @param {Object} obj      The object.
 * @param {String} path     The path to fetch the value for.
 * @returns {*}    value    The value at the specified path.
 */
module.exports = function(obj, path) {
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties.
    path = path.replace(/^\$/, '');           // strip a leadiing '$'.
    path = path.replace(/^\./, '');           // strip a leading dot.
    var a = path.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in obj) {
            obj = obj[k];
        } else {
            return;
        }
    }
    return obj;
};