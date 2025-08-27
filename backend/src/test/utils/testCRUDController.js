import { expect, vi } from 'vitest';

export async function testCRUDMethod({
  controller,
  method,
  modelMock,
  req = {},
  expectedStatus,
  expectedJson,
}) {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  };

  // Reemplaza el modelo por el mock
  controller.model = modelMock;

  await controller[method](req, res);

  expect(res.status).toHaveBeenCalledWith(expectedStatus);
  expect(res.json).toHaveBeenCalledWith(expectedJson);
}