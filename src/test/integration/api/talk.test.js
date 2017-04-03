import talk from "../../../api/talk";

test('talk integration tests', () => {

    describe('getTalk', () => {

        it('should get a talk with a valid id', () => {
            return talk.getTalk("JWG-0522").then((result) => {
                expect(result.id).toEqual("JWG-0522");
            }).catch((error) => {
                expect(true).toBe(false);
            })
        });

        it('should get a talk with an invalid id', () => {
            return talk.getTalk("JWG-0523")
              .then((result) => {
                  expect(true).toEqual(false);
              }).catch((error) => {
                  expect(error.name).toEqual("Error");
              });
        });

        it('should throw error when getting a talk with an undefined id', () => {
            return talk.getTalk().then((result) => {
                expect(true).toEqual(false);
            }).catch((error) => {
                console.log("helllo");
                expect(error.name).toEqual("Error");
            });
        });

    });
})
