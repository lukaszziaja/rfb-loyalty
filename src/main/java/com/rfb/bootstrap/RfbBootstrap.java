package com.rfb.bootstrap;

import com.rfb.domain.RfbEvent;
import com.rfb.domain.RfbEventAttendance;
import com.rfb.domain.RfbLocation;
import com.rfb.domain.RfbUser;
import com.rfb.repository.RfbEventAttendanceRepository;
import com.rfb.repository.RfbEventRepository;
import com.rfb.repository.RfbLocationRepository;
import com.rfb.repository.RfbUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.UUID;

@Component
public class RfbBootstrap implements CommandLineRunner {


    private final RfbLocationRepository rfbLocationRepository;
    private final RfbEventRepository rfbEventRepository;
    private final RfbEventAttendanceRepository rfbEventAttendanceRepository;
    private final RfbUserRepository rfbUserRepository;

    public RfbBootstrap(RfbLocationRepository rfbLocationRepository, RfbEventRepository rfbEventRepository, RfbEventAttendanceRepository rfbEventAttendanceRepository, RfbUserRepository rfbUserRepository) {
        this.rfbLocationRepository = rfbLocationRepository;
        this.rfbEventRepository = rfbEventRepository;
        this.rfbEventAttendanceRepository = rfbEventAttendanceRepository;
        this.rfbUserRepository = rfbUserRepository;
    }

    @Transactional
    @Override
    public void run(String... strings) throws Exception {
        if(rfbLocationRepository.count() == 0){
            initData();
        }
    }

    private void initData(){
        RfbUser rfbUser = new RfbUser();
        rfbUser.setUsername("John");
        rfbUserRepository.save(rfbUser);

        RfbLocation aleAndWitch = getRfbLocation("St Pete - Ale and Witch", DayOfWeek.TUESDAY.getValue());
        rfbUser.setHomeLocation(aleAndWitch);
        rfbUserRepository.save(rfbUser);

        RfbEvent aleEvent = getRfbEvent(aleAndWitch);
        getRfbEventAttendance(rfbUser,aleEvent);

        RfbLocation ratc = getRfbLocation("St Pete - Right Around The Corner", DayOfWeek.WEDNESDAY.getValue());

        RfbEvent ratcEvent = getRfbEvent(ratc);
        getRfbEventAttendance(rfbUser,ratcEvent);

        RfbLocation stPeteBrew = getRfbLocation("St Pete - St Pete Brewind", DayOfWeek.FRIDAY.getValue());

//        RfbEvent stPeteBrewEvent = getRfbEvent(stPeteBrew);
//        getRfbEventAttendance(rfbUser,stPeteBrewEvent);

        RfbLocation yard = getRfbLocation("St Pete - Yard of Ale", DayOfWeek.THURSDAY.getValue());

        RfbEvent yardEvent = getRfbEvent(yard);
        getRfbEventAttendance(rfbUser,yardEvent);

    }

    private void getRfbEventAttendance(RfbUser rfbUser, RfbEvent rfbEvent){
        RfbEventAttendance rfbEventAttendance = new RfbEventAttendance();
        rfbEventAttendance.setRfbEvent(rfbEvent);
        rfbEventAttendance.setRfbUser(rfbUser);
        rfbEventAttendance.setAttendanceDate(LocalDate.now());

        System.out.println(rfbEventAttendance.toString());

        rfbEventAttendanceRepository.save(rfbEventAttendance);
        rfbEventRepository.save(rfbEvent);
    }

    private RfbLocation getRfbLocation(String nameOfLocation, int runDayOfWeek){
        RfbLocation rfbLocation = new RfbLocation();
        rfbLocation.setLocationName(nameOfLocation);
        rfbLocation.setRunDayOfWeek(runDayOfWeek);
        System.out.println(rfbLocation);
        rfbLocationRepository.save(rfbLocation);
        return rfbLocation;
    }

    private RfbEvent getRfbEvent(RfbLocation rfbLocation){
        RfbEvent rfbEvent = new RfbEvent();
        rfbEvent.setEventCode(UUID.randomUUID().toString());
        rfbEvent.setEventDate(LocalDate.now());
        rfbLocation.addRfbEvent(rfbEvent);
        rfbLocationRepository.save(rfbLocation);
        rfbEventRepository.save(rfbEvent);
        return rfbEvent;
    }




}
