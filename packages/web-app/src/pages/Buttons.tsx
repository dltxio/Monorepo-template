import React from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/";
import CTA from "../components/dashboard/CTA";
import PageTitle from "../components/dashboard/Typography/PageTitle";
import SectionTitle from "../components/dashboard/Typography/SectionTitle";
import { EditIcon, HeartIcon } from "../icons";

type Props = {};

const Buttons: React.FC<Props> = props => {
  return (
    <>
      <PageTitle>Buttons</PageTitle>

      <CTA />

      <SectionTitle>Primary</SectionTitle>
      <div className="flex flex-col flex-wrap mb-8 space-y-4 md:flex-row md:items-end md:space-x-4">
        <div>
          <Button size="larger">Larger Button</Button>
        </div>

        <div>
          <Button size="large">Large Button</Button>
        </div>

        <div>
          <Button>Regular</Button>
        </div>

        <div>
          <Link to="/dashboard">
            <Button tag={Link as any}>Router Link</Button>
          </Link>
        </div>

        <div>
          <Button disabled>Disabled</Button>
        </div>

        <div>
          <Button size="small">Small</Button>
        </div>
      </div>

      <SectionTitle>Outline</SectionTitle>
      <div className="flex flex-col flex-wrap mb-8 space-y-4 md:flex-row md:items-end md:space-x-4">
        <div>
          <Button layout="outline" size="larger">
            Larger Button
          </Button>
        </div>

        <div>
          <Button layout="outline" size="large">
            Large Button
          </Button>
        </div>

        <div>
          <Button layout="outline">Regular</Button>
        </div>

        <div>
          <Link to="/dashboard">
            <Button layout="outline" tag={Link as any}>
              Router Link
            </Button>
          </Link>
        </div>

        <div>
          <Button layout="outline" disabled>
            Disabled
          </Button>
        </div>

        <div>
          <Button layout="outline" size="small">
            Small
          </Button>
        </div>
      </div>

      <SectionTitle>Link</SectionTitle>
      <div className="flex flex-col flex-wrap mb-8 space-y-4 md:flex-row md:items-end md:space-x-4">
        <div>
          <Button layout="link" size="larger">
            Larger Button
          </Button>
        </div>

        <div>
          <Button layout="link" size="large">
            Large Button
          </Button>
        </div>

        <div>
          <Button layout="link">Regular</Button>
        </div>

        <div>
          <Link to="/dashboard">
            <Button layout="link" tag={Link as any}>
              Router Link
            </Button>
          </Link>
        </div>

        <div>
          <Button layout="link" disabled>
            Disabled
          </Button>
        </div>

        <div>
          <Button layout="link" size="small">
            Small
          </Button>
        </div>
      </div>

      <SectionTitle>Icons</SectionTitle>
      <div className="flex flex-col flex-wrap mb-8 space-y-4 md:flex-row md:items-end md:space-x-4">
        <div>
          <Button iconRight={HeartIcon as any}>
            <span>Icon right</span>
          </Button>
        </div>

        <div>
          <Button iconLeft={HeartIcon as any}>
            <span>Icon Left</span>
          </Button>
        </div>

        <div>
          <Button icon={HeartIcon as any} aria-label="Like" />
        </div>

        <div>
          <Button icon={EditIcon as any} aria-label="Edit" />
        </div>

        <div>
          <Button icon={HeartIcon as any} layout="link" aria-label="Like" />
        </div>
        <div>
          <Button icon={HeartIcon as any} layout="outline" aria-label="Like" />
        </div>
      </div>
    </>
  );
};

export default Buttons;
