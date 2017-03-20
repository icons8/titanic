/* jshint -W097 */
'use strict';

export function on(id) {
    const e = 'swtched on ';
    console.log(e + id);
    lastid = id;
}

export default function toggle(id) {
    const e = 'toggled ';
    console.log(e + id);
    lastid = id;
}

export let lastid = 0;