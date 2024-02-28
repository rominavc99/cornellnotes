// src/components/Documentation.js

import React from "react";
import { Container, Typography, Box} from "@mui/material";

const Documentation = () => {
  return (

      <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Documentation
      </Typography>
      <Typography variant="body1" paragraph>
        In this section, you will find details on how to use the application, as
        well as a brief context of the idea's origin and a small glimpse into
        the technologies used for its development.
      </Typography>

      <Typography variant="body1" paragraph>
        The Cornell Note-Taking System is an effective method designed to
        organize notes more efficiently and review material more effectively.
        Developed by Walter Pauk at Cornell University in the 1940s, this
        technique divides the note page into three sections: cues, notes, and
        summary. The note-taking area is on the right side of the page, where
        you jot down main ideas, facts, and concepts during the lecture or
        reading. The left column, known as the cue or recall column, is reserved
        for keywords, questions, or cues that can prompt recall of the material.
        At the bottom of the page, a summary section allows you to summarize the
        main ideas of the notes in a few sentences. This method enhances
        learning by organizing information in a structured way, making it easier
        to review and study.
      </Typography>

      <Typography variant="body1" paragraph>
        In this particular context, IdeaCatcher was born as a personal project
        with the goal of enhancing my knowledge of React, as well as
        implementing NodeJS in React, and offering me a first introduction to
        Google's Material UI library, which I had never used before.
        Additionally, as a recent graduate building my development portfolio, I
        wanted to include some high-quality personal projects that would
        showcase my abilities.
      </Typography>

      <Typography variant="body1" paragraph>
        The concept of IdeaCatcher is more complex than a simple To-Do Notes
        App, which is a fairly common project, as it involves slightly more
        elaborate processes. So, let's say this application comes as part of my
        personal development as a professional.
      </Typography>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          How to use the application
        </Typography>
        <Typography variant="body1" paragraph>
          The application is quite simple and straightforward, making it very
          user-friendly. After logging in for the first time with your Google
          account, you will be greeted by the main page, which is directly the
          same space where you take notes. You will see the corresponding fields
          for each element of your note, and in the bottom right corner of the
          page, you will find a button to save your note once you have finished.
        </Typography>
        <Typography variant="body1" paragraph>
          Additionally, in the top left corner, you will find a menu icon which
          unfolds a sidebar where you can view all the notes you have created.
          By clicking on any of them, the original form will be updated with the
          data from that note so you can review or edit it. Just like when
          creating a note, you will find the action buttons at the bottom of the
          screen, this time with a new button to save your existing changes, as
          well as a button to delete the note completely if you wish.
        </Typography>
        <Typography variant="body1" paragraph>
          In the top right corner, you will find a logout button to close your
          session within the application. Upon logging out, you will be
          redirected to the main login page. When you log in again, you will
          find all your notes in their place.
        </Typography>
        <Typography variant="body1" paragraph>
          The last section of this application is the Footer, where you will
          find useful links to access the documentation, about us, and check the
          corresponding social networks.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          What is next?
        </Typography>
        <Typography variant="body1" paragraph>
          Although the key functionalities of the application have been
          achieved, there are still details and features we aim to implement in
          it. In the upcoming updates, we plan to add tags that can be created
          directly by the user and then added to the notes for better
          identification and classification, a search bar that allows the user
          to find notes using keywords, as well as the ability to generate and
          download a PDF file of the selected note.
        </Typography>
        <Typography variant="body1" paragraph>
          Additionally, we are aware that in terms of design, there are many
          improvements that can be made.
        </Typography>
        <Typography variant="body1" paragraph>
          We have many ideas and know that this project has more than one area
          of opportunity. Remember to visit us regularly to witness all the
          improvements that are coming in the future.
        </Typography>
      </Box>
    </Container>
  );
};

export default Documentation;
