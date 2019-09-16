setwd("/Users/oidetht/Desktop/2019-mlb-record/sources")

library(tidyverse)

cumulative_hrs <- function(df) {
  mutate(df, total_hrs = cumsum(df$HR))
  select(df, total_hrs)
}

total_hrs <- function(df) {
  mutate(df, total_hrs = cumsum(df$HR))
}

yankees_2018 <- read_csv("2018-yankees.csv")
mariners_1997 <- read_csv('1997-mariners.csv')
rangers_2005 <- read_csv('2005-rangers.csv')
jays_2010 <- read_csv('2010-jays.csv')
orioles_1996 <- read_csv('1996-orioles.csv')
orioles_2016 <- read_csv('2016-orioles.csv')
astros_2000 <- read_csv('2000-astros.csv')
rangers_2001 <- read_csv('2001-rangers.csv')
yankees_2012 <- read_csv('2012-yankees.csv')
mariners_1996 <- read_csv('1996-mariners.csv')
mariners_1999 <- read_csv('1999-mariners.csv')
jays_2000 <- read_csv('2000-jays.csv')
yankees_2009 <- read_csv('2009-yankees.csv')
athletics_1996 <- read_csv('1996-athletics.csv')
whitesox_2004 <- read_csv('2004-whitesox.csv')

twins_2019 <- read_csv('2019-twins.csv')
astros_2019 <- read_csv('2019-astros.csv')
dodgers_2019 <- read_csv('2019-dodgers.csv')
yankees_2019 <- read_csv('2019-yankees.csv')

all_teams <- yankees_2018[FALSE,]
yankees_2018 <- cumulative_hrs(yankees_2018)
mariners_1997 <- cumulative_hrs(mariners_1997)
rangers_2005 <- cumulative_hrs(rangers_2005)
jays_2010 <- cumulative_hrs(jays_2010)
orioles_1996 <- cumulative_hrs(orioles_1996)
orioles_2016 <- cumulative_hrs(orioles_2016)
astros_2000 <- cumulative_hrs(astros_2000)
rangers_2001 <- cumulative_hrs(rangers_2001)
yankees_2012 <- cumulative_hrs(yankees_2012)
mariners_1996 <- cumulative_hrs(mariners_1996)
mariners_1999 <- cumulative_hrs(mariners_1999)
jays_2000 <- cumulative_hrs(jays_2000)
yankees_2009 <- cumulative_hrs(yankees_2009)
athletics_1996 <- cumulative_hrs(athletics_1996)
whitesox_2004 <- cumulative_hrs(whitesox_2004)

twins_2019 <- cumulative_hrs(twins_2019)

astros_2019 <- total_hrs(astros_2019)
astros_2019 <- cumulative_hrs(astros_2019)

yankees_2019 <- total_hrs(yankees_2019)
yankees_2019 <- cumulative_hrs(yankees_2019)

dodgers_2019 <- total_hrs(dodgers_2019)
dodgers_2019 <- cumulative_hrs(dodgers_2019)

write.csv(yankees_2018, "2018-yankees-total.csv", row.names=FALSE, na="")
write.csv(mariners_1997, "1997-mariners-total.csv", row.names=FALSE, na="")
write.csv(rangers_2005, "2005-rangers-total.csv", row.names=FALSE, na="")
write.csv(jays_2010, "2010-jays-total.csv", row.names=FALSE, na="")
write.csv(orioles_1996, "1996-orioles-total.csv", row.names=FALSE, na="")
write.csv(orioles_2016, "2016-orioles-total.csv", row.names=FALSE, na="")
write.csv(astros_2000, "2000-astros-total.csv", row.names=FALSE, na="")
write.csv(rangers_2001, "2001-rangers-total.csv", row.names=FALSE, na="")
write.csv(yankees_2012, "2012-yankees-total.csv", row.names=FALSE, na="")
write.csv(mariners_1996, "1996-mariners-total.csv", row.names=FALSE, na="")
write.csv(mariners_1999, "1999-mariners-total.csv", row.names=FALSE, na="")
write.csv(jays_2000, "2000-jays-total.csv", row.names=FALSE, na="")
write.csv(yankees_2009, "2009-yankees-total.csv", row.names=FALSE, na="")
write.csv(athletics_1996, "1996-athletics-total.csv", row.names=FALSE, na="")
write.csv(whitesox_2004, "2004-whitesox-total.csv", row.names=FALSE, na="")

write.csv(twins_2019, '2019-twins-total.csv', row.names=FALSE, na='')
write.csv(astros_2019, '2019-astros-total.csv', row.names=FALSE, na='')
write.csv(yankees_2019, '2019-yankees-total.csv', row.names=FALSE, na='')
write.csv(dodgers_2019, '2019-dodgers-total.csv', row.names=FALSE, na='')





