import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

const AgendaContainer = styled.div`
  padding: 10rem 0;
  width: 90%;
  max-width: 1080px;
  margin: 0 auto;
`

const AgendaTitle = styled.h2`
  font-size: 2.6rem;
  color: #540cfa;
  text-align: center;
  line-height: 6rem;
  margin: 0 0 8rem 0;
`

const AgendaGroup = styled.div`
  margin: 0 0 8rem 0;
`

const AgendaTimeTitle = styled.h4`
  font-size: 2.6rem;
  color: #540cfa;
  text-align: center;
  line-height: 5rem;
  font-weight: 500;
  margin: 0 0 4rem 0;
`

const AgendaLectrueItem = styled.div`
  position: relative;
  padding: 0 0 0 6rem;
  margin: 0 0 4rem 0;

  @media (max-width: 480px) {
    padding: 0;
  }
`

const LectrueSpeakerImg = styled.img`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: 480px) {
    display: none;
  }
`

const LectrueTitleWrap = styled.div`
  background-color: #540cfa;
  padding: 1rem 2rem 1rem 8rem;

  @media (max-width: 480px) {
    padding: 1rem 2rem;
  }
`

const LectrueSpeaker = styled.span`
  margin: 0;
  color: #fff;
  font-weight: 500;
  font-size: 2rem;
  line-height: 4rem;
`

const LectrueSpeakerTitle = styled.span`
  margin: 0 0 0 1rem;
  color: #fff;
  font-size: 2rem;
  line-height: 4rem;
`

const LectrueSubtitleWrap = styled.div`
  background-color: #eee7ff;
  padding: 1rem 2rem 1rem 8rem;
  color: #000;
  font-size: 2rem;
  line-height: 4rem;

  @media (max-width: 480px) {
    padding: 1rem 2rem;
  }
`

const AgendaWorkshopItem = styled.div`
  margin: 0 0 4rem 0;
`

const WorkshopTitleWrap = styled.div`
  background-color: #540cfa;
  padding: 1rem 2rem;
  color: #fff;
  font-size: 2rem;
  line-height: 4rem;
`

const WorkshopSubtitleWrap = styled.div`
  background-color: #eee7ff;
  padding: 1rem 2rem;
  color: #000;
  font-size: 2rem;
  line-height: 4rem;
`
const WorkshopDescP = styled.p`
  margin: 0;
`

const AgendaList = () => (
  <StaticQuery
    query={graphql`
      query AgendaQuery {
        allPrismicAgenda(sort: { fields: [data___order] }) {
          group(field: data___time) {
            edges {
              node {
                data {
                  type
                  time
                  title
                  speaker_name
                  speaker_desc
                  speaker_photo {
                    url
                  }
                  workshop_desc
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        {data.allPrismicAgenda.group.map((group, gi) => (
          <AgendaGroup className="agenda-group" key={`agenda-group-${gi}`}>
            <AgendaTimeTitle>{group.edges[0].node.data.time}</AgendaTimeTitle>
            {group.edges.map((agd, ai) => {
              let { type, title, speaker_name, speaker_desc, speaker_photo, workshop_desc } = agd.node.data
              let res
              if (type === 'lecture') {
                res = (
                  <AgendaLectrueItem key={`agenda-iterm-${gi}-${ai}`}>
                    <LectrueTitleWrap>
                      <LectrueSpeakerImg src={speaker_photo.url} alt={speaker_name} title={speaker_name} />
                      <LectrueSpeaker>{speaker_name}</LectrueSpeaker>
                      <LectrueSpeakerTitle>{speaker_desc}</LectrueSpeakerTitle>
                    </LectrueTitleWrap>
                    <LectrueSubtitleWrap>{title}</LectrueSubtitleWrap>
                  </AgendaLectrueItem>
                )
              } else if (type === 'workshop') {
                res = (
                  <AgendaWorkshopItem key={`agenda-iterm-${gi}-${ai}`}>
                    <WorkshopTitleWrap>{title}</WorkshopTitleWrap>
                    {workshop_desc && (
                      <WorkshopSubtitleWrap>
                        {workshop_desc.split('\n').map((d, i) => (
                          <WorkshopDescP key={i}>{d}</WorkshopDescP>
                        ))}
                      </WorkshopSubtitleWrap>
                    )}
                  </AgendaWorkshopItem>
                )
              }
              return res
            })}
          </AgendaGroup>
        ))}
      </div>
    )}
  />
)

const Agenda = () => (
  <AgendaContainer className="section agenda">
    <AgendaTitle>大会议程</AgendaTitle>
    <AgendaList />
  </AgendaContainer>
)

export default Agenda
