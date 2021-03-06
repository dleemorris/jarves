<?php
/**
 * This file is part of Jarves.
 *
 * (c) Marc J. Schmidt <marc@marcjschmidt.de>
 *
 *     J.A.R.V.E.S - Just A Rather Very Easy [content management] System.
 *
 *     http://jarves.io
 *
 * To get the full copyright and license information, please view the
 * LICENSE file, that was distributed with this source code.
 */

namespace Jarves\ORM\Builder;

use Jarves\Configuration\Object;
use Jarves\Jarves;
use Jarves\Objects;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\Console\Output\OutputInterface;

class Builder
{

    /**
     * @var BuildInterface[]
     */
    protected $builder;

    /**
     * @var Jarves
     */
    protected $jarves;

    /**
     * @var \Jarves\Configuration\Object[]
     */
    protected $objects;

    /**
     * @param Jarves $jarves
     */
    function __construct(Jarves $jarves)
    {
        $this->jarves = $jarves;
    }

    /**
     * @param Jarves $jarves
     */
    public function setJarves($jarves)
    {
        $this->jarves = $jarves;
    }

    /**
     * @return Jarves
     */
    public function getJarves()
    {
        return $this->jarves;
    }

    /**
     * @param string $id
     * @param BuildInterface $builder
     */
    public function addBuilder($id, $builder)
    {
        $this->builder[$id] = $builder;
    }

    /**
     * Loads all objects and
     */
    public function bootBuildTime()
    {
        $this->objects = [];

        foreach ($this->getJarves()->getConfigs() as $bundleConfig) {
            if ($objects = $bundleConfig->getObjects()) {
                foreach ($objects as $object) {
                    $this->objects[strtolower($object->getKey())] = $object;
//                    $object->bootBuildTime($this->getJarves()->getConfigs());
                }
            }
        }

//        foreach ($this->objects as $object) {
//            $object->bootBuildTime($this->getJarves()->getConfigs());
//        }
    }

    /**
     * @param string $objectKey
     *
     * @return bool
     */
    public function hasObject($objectKey)
    {
        return isset($this->objects[strtolower($objectKey)]);
    }

    /**
     * @param string $objectKey
     *
     * @return \Jarves\Configuration\Object
     */
    public function getObject($objectKey)
    {
        return @$this->objects[strtolower($objectKey)];
    }

    /**
     * @param \Jarves\Configuration\Object $objectDefinition
     */
    public function addObject(Object $objectDefinition)
    {
        $this->objects[strtolower($objectDefinition->getId())] = $objectDefinition;
    }

    /**
     * @param string $id
     *
     * @return BuildInterface
     */
    public function getBuilder($id)
    {
        return @$this->builder[$id];
    }

    /**
     * Calls build on each builder.
     *
     * @return string
     */
    public function build(OutputInterface $output = null)
    {
        $this->bootBuildTime();

        if (!$output) {
            $output = new BufferedOutput();
        }

        foreach ($this->builder as $builder) {
            $builder->build($this->objects, $output);
        }

        if ($output instanceof BufferedOutput) {
            return $output->fetch();
        }
    }

    /**
     * Returns whether at least one orm builder needs a build.
     *
     * @return bool
     */
    public function needsBuild(){
        foreach ($this->builder as $builder) {
            if ($builder->needsBuild()) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks if at least one orm builder needs a build and triggers the build then.
     */
    public function boot()
    {
        if ($this->needsBuild()) {
            $this->build();
        }
    }
}