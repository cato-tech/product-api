const assert = require('assert');

async function runTest() {
  console.log('--- Starting CRUD Verification Test ---');

  // Chờ MongoDB sẵn sàng
  await new Promise(r => setTimeout(r, 2000));

  // Test Health
  const healthRes = await fetch('http://localhost:3000/health');
  const healthData = await healthRes.json();
  assert.strictEqual(healthRes.status, 200);
  assert.strictEqual(healthData.database, 'UP');
  console.log('✓ Health check passed');

  // Test Create
  const createRes = await fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pid: 'P001', pname: 'Mechanical Keyboard', price: 100, quantity: 10 })
  });
  assert.strictEqual(createRes.status, 201);
  console.log('✓ Create Product passed');

  // Test Read All
  const getAllRes = await fetch('http://localhost:3000/api/products');
  const items = await getAllRes.json();
  assert.strictEqual(items.length >= 1, true);
  console.log('✓ Read All Products passed');

  // Test Read One
  const getOneRes = await fetch('http://localhost:3000/api/products/P001');
  const oneItem = await getOneRes.json();
  assert.strictEqual(oneItem.pid, 'P001');
  console.log('✓ Read One Product passed');

  // Test Update
  const updateRes = await fetch('http://localhost:3000/api/products/P001', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ price: 120 })
  });
  const updatedItem = await updateRes.json();
  assert.strictEqual(updateRes.status, 200);
  assert.strictEqual(updatedItem.price, 120);
  console.log('✓ Update Product passed');

  // Test Delete
  const deleteRes = await fetch('http://localhost:3000/api/products/P001', {
    method: 'DELETE'
  });
  assert.strictEqual(deleteRes.status, 200);
  console.log('✓ Delete Product passed');

  console.log('--- All Tests Passed Successfully ---');
  process.exit(0);
}

runTest().catch((err) => {
  console.error('Test Failed:', err);
  process.exit(1);
});