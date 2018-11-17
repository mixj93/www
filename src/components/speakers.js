import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'

const SpeakersContainer = styled.div`
  text-align: center;
  padding: 10rem 0;
`

const SpeakersTitle = styled.h2`
  font-size: 2.6rem;
  color: #540CFA;
  text-align: center;
  line-height: 6rem;
  margin-bottom: 12rem;
`

const SpeakersDivider = styled.div`
  background-color: #540CFA;
  height: 4px;
  width: 384px;
  margin: 0 auto 5rem auto;

  @media (max-width: 383px) {
    width: 90%;
  }
`

const SpeakersText = styled.p`
  font-size: 2.2rem;
  color: #3C64DC;
  text-align: center;
  line-height: 6rem;
  padding: 0 20px;
  margin-bottom: 0 auto 50px auto;
`

const SpeakersButton = styled.a`
  display: inline-block;
  background: #540CFA;
  box-shadow: 0 2px 4px 0 rgba(60,9,179,0.30);
  border-radius: 9px;
  font-size: 2.2rem;
  color: #FFFFFF;
  text-align: center;
  line-height: 6rem;
  padding: 0 10rem;
  margin: 0 auto;
  text-decoration: none;
`

const SpeakersListWrapper = styled.div`
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-wrap: wrap;

  &:after {
    content: '';
    flex: auto;
  }

  @media (min-width: 1280px) {
    margin: 0 11rem;
  }

  @media (max-width: 1279px) {
    
  }
`

const SpeakersItem = styled.div`
  margin-bottom: 8rem;

  @media (min-width: 1400px) {
    width: 20%;
  }

  @media (max-width: 1399px) and (min-width: 1280px) {
    width: 25%;
  }

  @media (max-width: 1279px) and (min-width: 756px) {
    width: 33.333%;
  }

  @media (max-width: 756px) {
    width: 50%;
  }
`

const SpeakerPhoto = styled.img`
  border-radius: 50%;

  @media (min-width: 1280px) {
    width: 220px;
    height: 220px;
  }

  @media (max-width: 1279px) and (min-width: 700px) {
    width: 192px;
    height: 192px;
  }

  @media (max-width: 699px) {
    width: 148px;
    height: 148px;
  }
`

const SpeakerName = styled.h4`
  font-size: 2.2rem;
  color: #005CC7;
  text-align: center;
  line-height: 3.2rem;
  margin-bottom: 16px;
`

const SpeakerInfo = styled.p`
  font-size: 1.5rem;
  color: #272727;
  text-align: center;
  line-height: 3rem;
  margin-bottom: 0;
`

const SpeakersList = () => (
  <StaticQuery
    query={graphql`
      query SpeakersQuery {
        allPrismicSpeaker {
          edges {
            node {
              data {
                id
                name
                title {
                  text
                }
                company {
                  text
                }
                photo {
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <SpeakersListWrapper>
        {data.allPrismicSpeaker.edges.map(speaker => {
          let { id, name, title, company, photo } = speaker.node.data
          return (
            <SpeakersItem key={id}>
              <Link to={`/speakers/${id}`}><SpeakerPhoto src={photo.url} alt={name} title={name} /></Link>
              <SpeakerName>{name}</SpeakerName>
              <SpeakerInfo>{company.text}</SpeakerInfo>
              <SpeakerInfo>{title.text}</SpeakerInfo>
            </SpeakersItem>
          )
        })}
      </SpeakersListWrapper>
    )}
  />
)

const Speakers = () => (
  <SpeakersContainer id="speakers" className="section speakers">
    <SpeakersTitle>演讲嘉宾</SpeakersTitle>
    <SpeakersList />
    <SpeakersDivider />
    <SpeakersText>加入 ECUG，和业界大牛一起解锁 ABC 实践新姿势，更有机会与偶像大咖共进晚餐哦 ！</SpeakersText>
    <SpeakersButton href="https://www.gatsbyjs.org/docs/styled-components/" target="_blank">报名成为讲师</SpeakersButton>
  </SpeakersContainer>
)

export default Speakers