import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "ScenarioXP SequenceExplorer | TailAdmin - Next.js Dashboard Template",
  description:
    "This is a documentation page for ScenarioXP SequenceExplorer class",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <FormElements />
    </DefaultLayout>
  );
};

export default FormElementsPage;
