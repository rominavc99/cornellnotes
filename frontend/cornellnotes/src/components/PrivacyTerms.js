import React from 'react'
import { Container, Typography, Box} from "@mui/material";

function PrivacyTerms() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Privacy Policy and Terms of Service for IdeaCatcher
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to IdeaCatcher! Your privacy and the security of your data are
        of paramount importance to us. This Privacy Policy and Terms of Service
        document outlines the types of information we collect, how it is used,
        and the steps we take to protect your privacy.
      </Typography>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Google Authentication:
        </Typography>
        <Typography variant="body1" paragraph>
          IdeaCatcher utilizes Google Authentication for logging into our
          application. This means that the login process is managed through
          Google's secure login framework, ensuring a safe and straightforward
          way for you to access our services.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Data Collection:
        </Typography>
        <Typography variant="body1" paragraph>
          The only data we store in our database is your Google profile ID. This
          identifier is used to manage your session and to provide a
          personalized experience within IdeaCatcher. We access only the
          information you authorize when you log in for the first time, in
          accordance with Google's authentication procedures.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Data Usage:
        </Typography>
        <Typography variant="body1" paragraph>
          The information we access is solely for the purpose of providing and
          improving our services to you. We do not share, sell, rent, or trade
          personal information with third parties for their commercial purposes.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Data Security:
        </Typography>
        <Typography variant="body1" paragraph>
          We are committed to protecting the security of your personal
          information. We take reasonable precautions to protect your
          information from loss, theft, misuse, unauthorized access, disclosure,
          alteration, and destruction.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Account Deletion:
        </Typography>
        <Typography variant="body1" paragraph>
          If at any time you decide to permanently delete your account from our
          database, you can do so by sending an email to procrom1999@gmail.com
          with the subject line "DELETE MY IDEA CATCHER ACCOUNT". Please include
          the Google email address with which you logged in. Upon receiving your
          request, we will confirm the deletion of your account via email.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Changes to This Policy:
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to modify this privacy policy at any time, so
          please review it frequently. Changes and clarifications will take
          effect immediately upon their posting on the website. If we make
          material changes to this policy, we will notify you here that it has
          been updated.
        </Typography>

        <Typography variant="body1" paragraph>
          By using IdeaCatcher, you consent to the terms outlined in this
          Privacy Policy and Terms of Service.
        </Typography>

        <Typography variant="body1" paragraph>
          Thank you for choosing IdeaCatcher. We are excited to have you on
          board and look forward to providing you with a service that respects
          your privacy and data security.
        </Typography>
      </Box>
    </Container>
  );
}

export default PrivacyTerms