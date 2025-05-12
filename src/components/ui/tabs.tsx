
import * as React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { cn } from "@/lib/utils";

const Tabs = TabView;

const TabsList = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  // This is a placeholder - PrimeReact's TabView does not have a separate tabs list component
  return null;
};

const TabsTrigger = ({ className, value, ...props }: { value: string, className?: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  // This is a placeholder - PrimeReact's TabView does not have a separate trigger component
  return null;
};

const TabsContent = ({ className, value, ...props }: { value: string, className?: string } & React.HTMLAttributes<HTMLDivElement>) => {
  // PrimeReact uses TabPanel instead
  return <TabPanel header={value} {...props} />;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
