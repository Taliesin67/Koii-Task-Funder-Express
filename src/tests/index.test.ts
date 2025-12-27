import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Basic Server Setup', () => {
  it('should respond to root endpoint', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Welcome to the Hero API' });
  });
});