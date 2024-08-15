import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Link,
  Tailwind,
} from "@react-email/components";

const SampleEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>This is a preview text</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="max-w-xl mx-auto p-6 bg-white rounded-md">
            <Heading className="text-2xl font-bold text-gray-800 mb-4">
              Welcome to Our Service
            </Heading>
            <Text className="text-lg text-gray-700 mb-4">Hi there,</Text>
            <Text className="text-lg text-gray-700 mb-6">
              We're excited to have you get started. First, you need to confirm
              your account. Just press the button below.
            </Text>
            <Link
              href="https://your-confirmation-link.com"
              className="inline-block px-6 py-3 bg-blue-600 text-white text-center rounded-md no-underline"
            >
              Confirm Account
            </Link>
            <Text className="text-lg text-gray-700 mt-6">
              If you have any questions, feel free to{" "}
              <Link
                href="mailto:support@yourservice.com"
                className="text-blue-600 underline"
              >
                contact our support team
              </Link>
              .
            </Text>
            <Text className="text-lg text-gray-700 mt-6">
              Cheers,
              <br />
              The Your Service Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SampleEmail;
