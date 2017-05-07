import { getVideos } from "../../../main/api/videoSearch";

describe("getVideos", () => {
  it("should return videos for the DevOps track", () => {
    return getVideos("DevOps")
      .then(
        result => {
          expect(result).toEqual([
            {
              id: "TrjeyRAEp48",
              kind: "video",
              title: "DevOps - Microservices, containers, platforms, tooling... Oh yeah, and people",
              description: "by Daniel Bryant & Steve Poole Two years ago at Devoxx UK we talked about DevOps, what it was, why it was important and how to get started. Boy, was it scary ...",
              imageUrl: "https://i.ytimg.com/vi/TrjeyRAEp48/default.jpg",
              link: "https://youtube.com/watch?v=TrjeyRAEp48"
            },
            {
              id: "tIYPATalcGs",
              kind: "video",
              title: "Dev versus Ops by Dan Hardiker & Henry Whincup",
              description: "DevOps has become a buzz word, it's talked about in many different ways but so often the point about people is quickly forgotten over the technical ...",
              imageUrl: "https://i.ytimg.com/vi/tIYPATalcGs/default.jpg",
              link: "https://youtube.com/watch?v=tIYPATalcGs"
            },
            {
              id: "c9uvV4ChIXw",
              kind: "video",
              title: "Cybercrime and the Developer. How to start defending against the darker side of the web",
              description: "by Steve Poole In the world of DevOps and the Cloud most developers have to learn new technologies and methodologies. The focus tends to be on adding ...",
              imageUrl: "https://i.ytimg.com/vi/c9uvV4ChIXw/default.jpg",
              link: "https://youtube.com/watch?v=c9uvV4ChIXw"
            },
            {
              id: "yLg-LPSRjho",
              kind: "video",
              title: "Building microservices with Vert.x by Bert Jan Schrijver",
              description: 'Vert.x is a toolkit for building reactive applications on the JVM. It was awarded for "Most Innovative Java Technology" at the JAX Innovation awards. Vert.x is ...',
              imageUrl: "https://i.ytimg.com/vi/yLg-LPSRjho/default.jpg",
              link: "https://youtube.com/watch?v=yLg-LPSRjho"
            },
            {
              id: "a6lZWaqKSmY",
              kind: "video",
              title: "Docker and Kubernetes Recipes for Java Developers by Arun Gupta",
              description: "Containers are enabling developers to package their applications in new ways that are portable and work consistently everywhere. Docker has become the de ...",
              imageUrl: "https://i.ytimg.com/vi/a6lZWaqKSmY/default.jpg",
              link: "https://youtube.com/watch?v=a6lZWaqKSmY"
            }
          ]);
        },
        error => {
          raiseOrPassError(
            "UnexpectedErrorException",
            'Unexpected error on "getScheduledTalks" ',
            error
          );
        }
      )
      .catch(error => {
        console.error(error);
        throw error;
      });
  });
});
