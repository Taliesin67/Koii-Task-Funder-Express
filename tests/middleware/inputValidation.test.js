import { describe, it, expect, vi } from 'vitest';
import { 
  validateCoinListParams, 
  validateCoinPriceParams, 
  validateCoinDetailsParams 
} from '../../src/middleware/inputValidation';

// Helper function to create mock request, response, and next function
const createMockReqRes = (query = {}, params = {}) => {
  const req = { query, params };
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  };
  const next = vi.fn();
  return { req, res, next };
};

describe('Input Validation Middleware', () => {
  describe('Coin Price Validation', () => {
    it('should validate correct coin price query params', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin' });
      
      validateCoinPriceParams(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should reject invalid coin price query params', () => {
      const { req, res, next } = createMockReqRes({}, { id: '' });
      
      validateCoinPriceParams(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Coin ID is required' });
    });
  });

  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', () => {
      const { req, res, next } = createMockReqRes({ 
        order: 'market_cap_desc', 
        per_page: '10', 
        page: '1' 
      });
      
      validateCoinListParams(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should reject invalid order parameter', () => {
      const { req, res, next } = createMockReqRes({ order: 'invalid_order' });
      
      validateCoinListParams(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid order parameter' });
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin' });
      
      validateCoinDetailsParams(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should reject invalid coin ID', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin!@#' });
      
      validateCoinDetailsParams(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid coin ID format' });
    });
  });
});