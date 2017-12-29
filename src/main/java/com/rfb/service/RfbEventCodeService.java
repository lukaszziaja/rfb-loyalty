package com.rfb.service;


import com.rfb.domain.RfbEvent;
import com.rfb.domain.RfbLocation;
import com.rfb.repository.RfbEventRepository;
import com.rfb.repository.RfbLocationRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RfbEventCodeService {

    private final Logger log = LoggerFactory.getLogger(RfbEventCodeService.class);

    private final RfbLocationRepository rfbLocationRepository;
    private final RfbEventRepository rfbEventRepository;

    public RfbEventCodeService(RfbLocationRepository rfbLocationRepository, RfbEventRepository rfbEventRepository) {
        this.rfbLocationRepository = rfbLocationRepository;
        this.rfbEventRepository = rfbEventRepository;
    }

    @Scheduled(cron = "0 0 * * * ?")//run once per our
    //@Scheduled(cron = "* * * * * ?")
    public void generateRunEventCodes(){

        log.debug("Gen events");
        List<RfbLocation> rfbLocations = rfbLocationRepository.findAllByRunDayOfWeek(LocalDate.now().getDayOfWeek().getValue());

        log.debug("Location found for events: " + rfbLocations.size());

        rfbLocations.forEach(location -> {
            log.debug("Checking events for location: " + location.getId());

            RfbEvent existingEvent = rfbEventRepository.findByRfbLocationAndEventDate(location,LocalDate.now());

            if(existingEvent == null){
                log.debug("Event not found, creating event");
                RfbEvent newEvent = new RfbEvent();
                newEvent.setRfbLocation(location);
                newEvent.setEventDate(LocalDate.now());
                newEvent.setEventCode(RandomStringUtils.randomAlphabetic(10).toUpperCase());

                rfbEventRepository.save(newEvent);

                log.debug("Created event: " + newEvent.getId());
            }else{
                log.debug("Event exists for day");
            }
        });

    }
}
