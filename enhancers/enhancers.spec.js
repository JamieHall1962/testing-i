const { success, fail, repair } = require("./enhancers");

describe("Enhancers", () => {
  describe("Repair()", () => {
    it("Restore durability to 100", () => {
      const actual = repair({ durability: 0 });
      expect(actual.durability).toBe(100);
    });

    it("Repair should ony care about durability", () => {
      const actual = repair({
        name: "Should not matter",
        durability: 20
      });
      expect(actual).toEqual({ name: "Should not matter", durability: 100 });
    });
  });

  describe("Success()", () => {
    it("Up 1 Level", () => {
      const testItem = {
        name: "[+10] Iron Sword",
        originalName: "Iron Sword",
        type: "weapon",
        durability: 100,
        enhancement: 10
      };
      const expectedItem = {
        name: "[+11] Iron Sword",
        originalName: "Iron Sword",
        type: "weapon",
        durability: 100,
        enhancement: 11
      };
      const actual = success(testItem);
      expect(actual).toEqual(expectedItem);
      expect(actual.enhancement).toBe(11);
      expect(actual.name).toBe("[+11] Iron Sword");
    }),
      it("Everything that comes back should be an object", () => {
        const testItem = {
          name: "[+10] Iron Sword",
          originalName: "Iron Sword",
          type: "weapon",
          durability: 100,
          enhancement: 10
        };
        const successes = success(testItem);
        const repairs = repair(testItem);
        const fails = fail(testItem);
        expect(typeof successes).toBe("object");
        expect(typeof repairs).toBe("object");
        expect(typeof fails).toBe("object");
      }),
      it("Should not allow Level to be enhanced Past 20", () => {
        const testItem = {
          name: "[PEN] Iron Sword",
          originalName: "Iron Sword",
          type: "weapon",
          durability: 100,
          enhancement: 20
        };
        expect(() => {
          success(testItem);
        }).toThrow();
      }),
      it("Should not allow enhancement if Level <14 && Durability < 25", () => {
        const testItem = {
          name: "[+7] Iron Sword",
          originalName: "Iron Sword",
          type: "weapon",
          durability: 15,
          enhancement: 7
        };
        expect(() => {
          success(testItem);
        }).toThrow();
      });
  });

  describe("Fail()", () => {
    it("Enhancement Fails Below Level 16", () => {
      const testItem = {
        name: "[+10] Iron Sword",
        originalName: "Iron Sword",
        type: "weapon",
        durability: 100,
        enhancement: 10
      };
      const expectedItem = {
        name: "[+10] Iron Sword",
        originalName: "Iron Sword",
        type: "weapon",
        durability: 95,
        enhancement: 10
      };
      const actual = fail(testItem);
      expect(actual).toEqual(expectedItem);
      expect(actual.enhancement).toBe(expectedItem.enhancement);
      expect(actual.name).toBe(expectedItem.name);
      expect(actual.durability).toBe(expectedItem.durability);
    }),
      it("Enhancement Fails Above Level 16", () => {
        const testItem = {
          name: "[TET] Iron Sword",
          originalName: "Iron Sword",
          type: "weapon",
          durability: 100,
          enhancement: 19
        };
        const expectedItem = {
          name: "[TRI] Iron Sword",
          originalName: "Iron Sword",
          type: "weapon",
          durability: 90,
          enhancement: 18
        };
        const actual = fail(testItem);
        expect(actual).toEqual(expectedItem);
        expect(actual.enhancement).toBe(expectedItem.enhancement);
        expect(actual.name).toBe(expectedItem.name);
        expect(actual.durability).toBe(expectedItem.durability);
      }),
      it("Should not allow a fail if below level 7 && Type === weapon", () => {
        const testItem = {
          name: "[+6] Iron Sword",
          originalName: "Iron Sword",
          type: "weapon",
          durability: 100,
          enhancement: 6
        };
        expect(() => {
          fail(testItem);
        }).toThrow();
      }),
      it("Should not allow a fail if below level 5 && Type === armor", () => {
        const testItem = {
          name: "[+4] Plate of Armor",
          originalName: "Plate of Armor",
          type: "armor",
          durability: 100,
          enhancement: 4
        };
        expect(() => {
          fail(testItem);
        }).toThrow();
      });
  });
});
