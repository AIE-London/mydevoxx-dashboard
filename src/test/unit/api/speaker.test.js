import speaker from "../../../main/api/speaker";

test("speaker integration test", () => {
  describe("parseTalkId", () => {
    it("should parse a comma delimited list of talkIds", () => {
      expect(speaker.parseTalkId("talkId1, talkId2")).toEqual([
        "talkId1",
        "talkId2"
      ]);
    });

    it("should parse a comma delimited list of tracks even when there is only one", () => {
      expect(speaker.parseTalkId("Java Language")).toEqual(["Java Language"]);
    });

    it("should parse a comma delimited list of tracks even when there is no tracks sent", () => {
      expect(speaker.parseTalkId()).toEqual([]);
    });
  });
});
