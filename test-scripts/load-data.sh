#!/usr/bin/env bash

if [[ $# -lt 2 ]] ; then
    echo 'usage: load-data.sh [num-of-events-per-second] [num-of-seconds-to-execute]'
    exit 0
fi

EVENTCOUNT=$1
COUNT=0

echo "Feeding in ${EVENTCOUNT} every second for ${2} seconds"
echo "Hit ctrl+c to cancel early"

EVENTS=0

while [ ${COUNT} -lt $2 ]
do
    START=1
    END=${EVENTCOUNT}
    JSON="["

    for (( c=$START; c<=$END; c++ ))
    do
        JSON="${JSON} {\"Data\": \"blob\",\"PartitionKey\": \"uuidgen\"},"
    done
    JSON="${JSON::-1}]"

    aws kinesis put-records \
        --records "$JSON" \
        --stream-name test

	COUNT=$((COUNT + 1))
	EVENTS=$((EVENTS + EVENTCOUNT))

    START=1
    END=${EVENTCOUNT}

    echo "Put ${EVENTCOUNT} events in Kinesis"
	sleep 1
done

echo "Should have ${EVENTS} in dynamo"