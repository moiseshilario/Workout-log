const app = require('./utils');

describe('Add and subtract total hours of exercise', () => {

  it('should add 1 hour to totalHours', () => {
    let totalHours = 0;
    expect(app.sumHours(totalHours, 1)).toBe(1);
  });

  it('should subtract 1 hour of totalHours', () => {
     let totalHours = 1;
     expect(app.subtractHours(totalHours, 1)).toBe(0); 
  });

  
});