import NewsAPI from "newsapi";
import React from "react";

import { Card, CardBody } from "../components";
import InfoCard from "../components/dashboard/Cards/InfoCard";
import CTA from "../components/dashboard/CTA";
import RoundIcon from "../components/dashboard/RoundIcon";
import PageTitle from "../components/dashboard/Typography/PageTitle";
import SectionTitle from "../components/dashboard/Typography/SectionTitle";
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from "../icons";

type Props = {};

const Cards: React.FC<Props> = props => {
  let feed: any[] = [];
  const newsapi = new NewsAPI("8dda2183be2d4841a978b5ac04511d66", {
    corsProxyUrl: "https://cors-anywhere.herokuapp.com/"
  });
  newsapi.v2
    .everything({
      q: "energy",
      sources: "bbc-news,the-verge",
      domains: "bbc.co.uk,techcrunch.com",
      from: "2021-12-01",
      to: "2021-12-22",
      language: "en",
      sortBy: "relevancy",
      page: 2
    })
    .then((response: any) => {
      feed = response.articles;
      console.log(feed);
      /*
      {
        status: "ok",
        articles: [...]
      }
    */
    })
    .catch((err: string | undefined) => {
      throw new Error(err);
    });

  return (
    <>
      <PageTitle>News</PageTitle>

      <SectionTitle>Big section cards</SectionTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
            Revenue
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {feed}
            {feed.map(l => {
              l.title;
            })}
          </p>
        </CardBody>
      </Card>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card>
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
              Revenue
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </p>
          </CardBody>
        </Card>

        <Card colored className="text-white bg-blue-600">
          <CardBody>
            <p className="mb-4 font-semibold">Colored card</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Cards;
