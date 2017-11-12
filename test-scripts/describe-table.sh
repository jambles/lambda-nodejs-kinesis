#!/usr/bin/env bash

if [[ $# -lt 1 ]] ; then
    echo 'usage: describe-table.sh [table]'
    exit 0
fi

aws dynamodb scan --table-name $1 --select "COUNT"