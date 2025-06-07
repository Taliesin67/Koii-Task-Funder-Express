import { describe, it, expect } from 'vitest';
import { validateCoinListParams, validateCoinPriceParams, validateCoinDetailsParams } from '../../src/middleware/inputValidation';

// Helper function to create mock request and response objects
function createMockReqRes(query = {}, params = {}) {
  const req = { query, params };
  const res = {
    status: () => res,
    json: () => res
  };
  const next = () => {};
  return { req, res, next };
}

describe('Input Validation Middleware', () => {
  describe('Coin Price Validation', () => {
    it('should validate correct coin price query params', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin' });
      const spy = {
        status: () => spy,
        json: () => spy
      };
      
      expect(() => validateCoinPriceParams(req, spy, next)).not.toThrow();
    });

    it('should reject invalid coin price query params', () => {
      const { req, res } = createMockReqRes({}, {});
      const jsonSpy = vi.fn();
      const statusSpy = vi.fn().mockReturnValue({ json: jsonSpy });
      
      validateCoinPriceParams(req, { status: statusSpy } as any, () => {});
      
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ error: 'Coin ID is required' });
    });
  });

  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', () => {
      const { req, res, next } = createMockReqRes({ 
        order: 'market_cap_desc', 
        per_page: '10', 
        page: '1' 
      });
      const spy = {
        status: () => spy,
        json: () => spy
      };
      
      expect(() => validateCoinListParams(req, spy, next)).not.toThrow();
    });

    it('should reject invalid order parameter', () => {
      const { req, res } = createMockReqRes({ order: 'invalid_order' });
      const jsonSpy = vi.fn();
      const statusSpy = vi.fn().mockReturnValue({ json: jsonSpy });
      
      validateCoinListParams(req, { status: statusSpy } as any, () => {});
      
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ error: 'Invalid order parameter' });
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin' });
      const spy = {
        status: () => spy,
        json: () => spy
      };
      
      expect(() => validateCoinDetailsParams(req, spy, next)).not.toThrow();
    });

    it('should reject invalid coin ID', () => {
      const { req, res } = createMockReqRes({}, { id: 'bitcoin!@#' });
      const jsonSpy = vi.fn();
      const statusSpy = vi.fn().mockReturnValue({ json: jsonSpy });
      
      validateCoinDetailsParams(req, { status: statusSpy } as any, () => {});
      
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ error: 'Invalid coin ID format' });
    });
  });
});