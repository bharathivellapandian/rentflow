/*
 * Lightweight reference tests for the prototype's intended role matrix.
 * The browser application itself remains in index.html.
 */
const assert = require('assert');

const permissions = {
  admin: ['dashboard','properties','tenants','payments','maintenance','tenant-documents','legal-documents','reports','admin'],
  owner: ['dashboard','properties','tenants','payments','maintenance','tenant-documents','legal-documents','reports'],
  tenant: ['dashboard','payments','maintenance','tenant-documents','legal-documents']
};

assert(permissions.admin.includes('admin'));
assert(permissions.owner.includes('properties'));
assert(!permissions.owner.includes('admin'));
assert(permissions.tenant.includes('maintenance'));
assert(!permissions.tenant.includes('properties'));
assert(!permissions.tenant.includes('admin'));

console.log('RentFlow authorization reference tests passed.');

//test for the git account check
